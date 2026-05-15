"use client";

import { useState, useRef } from "react";
import { UploadCloud, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { apiClient } from "@/lib/api/client";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";

interface ImageUploadProps {
  value: string | string[];
  onChange: (value: string | string[]) => void;
  disabled?: boolean;
  multiple?: boolean;
}

export function ImageUpload({ value, onChange, disabled, multiple }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (file: File) => {
    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append("file", file);

      const res = await apiClient.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const url = res.data.data.url;

      if (multiple) {
        const currentUrls = Array.isArray(value) ? value : (value ? [value] : []);
        onChange([...currentUrls, url]);
      } else {
        onChange(url);
      }
      toast.success("Image uploaded successfully");
    } catch (err) {
      toast.error("Failed to upload image. Check Cloudinary config.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    // For simplicity, we upload files sequentially if multiple
    if (multiple) {
      Array.from(files).forEach(f => handleUpload(f));
    } else {
      handleUpload(files[0]);
    }
    
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const handleRemove = (urlToRemove: string) => {
    if (multiple && Array.isArray(value)) {
      onChange(value.filter(url => url !== urlToRemove));
    } else {
      onChange("");
    }
  };

  const urls = multiple 
    ? (Array.isArray(value) ? value : (typeof value === 'string' && value ? [value] : [])) 
    : (typeof value === "string" && value ? [value] : []);

  const [manualInput, setManualInput] = useState("");

  const handleAddManual = () => {
    if (manualInput.trim()) {
      onChange([...urls, manualInput.trim()]);
      setManualInput("");
    }
  };

  return (
    <div className="space-y-4 w-full">
      <div className="flex flex-wrap gap-4">
        {urls.map((url, i) => (
          <div key={i} className="relative w-[150px] h-[150px] rounded-md overflow-hidden border">
            <div className="z-10 absolute top-1 right-1">
              <Button type="button" onClick={() => handleRemove(url)} variant="destructive" size="icon" className="h-6 w-6">
                <X className="h-4 w-4" />
              </Button>
            </div>
            <img src={url} alt="Uploaded" className="object-cover w-full h-full" />
          </div>
        ))}
        
        {(!multiple && urls.length === 0) || multiple ? (
          <div className="relative w-[150px] h-[150px] rounded-md border-2 border-dashed flex flex-col justify-center items-center gap-2 hover:bg-muted/50 transition cursor-pointer">
            <input
              type="file"
              ref={inputRef}
              onChange={handleFileChange}
              disabled={disabled || isUploading}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
              multiple={multiple}
              accept="image/*"
            />
            {isUploading ? (
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            ) : (
              <>
                <UploadCloud className="h-8 w-8 text-muted-foreground" />
                <span className="text-xs text-muted-foreground text-center px-4">
                  Click or drag to upload
                </span>
              </>
            )}
          </div>
        ) : null}
      </div>

      <div className="flex items-center gap-2 mt-2">
        <span className="text-sm font-medium whitespace-nowrap">Or provide URL manually:</span>
        {multiple ? (
          <div className="flex flex-1 gap-2">
            <Input 
              value={manualInput} 
              onChange={(e) => setManualInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddManual();
                }
              }}
              disabled={disabled || isUploading}
              placeholder="https://... (Press Enter to add)"
              className="flex-1"
            />
            <Button 
              type="button" 
              onClick={handleAddManual}
              disabled={disabled || isUploading || !manualInput.trim()}
              variant="secondary"
            >
              Add
            </Button>
          </div>
        ) : (
          <Input 
            value={typeof value === 'string' ? value : ''} 
            onChange={(e) => onChange(e.target.value)} 
            disabled={disabled || isUploading}
            placeholder="https://..."
            className="flex-1"
          />
        )}
      </div>
    </div>
  );
}
