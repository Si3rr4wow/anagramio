import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { uploadDictionary } from "./actions";

export const UploadForm = () => {
  return (
    <form action={uploadDictionary}>
      <Input label="Upload a dictionary" name="dictionary" type="file" />
      <Button type="submit" color="primary" className="mt-4">
        Upload
      </Button>
    </form>
  );
};
