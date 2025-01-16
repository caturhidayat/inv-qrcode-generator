import { useForm } from "react-hook-form";
import { decryption } from "@/utils/encrypt-invoice";
import { useState } from "react";
import { decryptSchema } from "@/utils/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import AlertInput from "./AlertInput";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";

export default function DecryptForm() {
  const [decrypted, setDecrypted] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(decryptSchema),
    defaultValues: {
      decryption_text: null,
      secret_key: null,
    },
  });
  // Handle Submit Data
  const submitData = (data) => {
    const jsonForDecrypt = {
      decryption_text: data.decryption_text,
      secret_key: data.secret_key,
      secret_iv: "",
      key_size: 128,
      output_type: "Base64",
      mode: "CBC",
    };
    try {
      const decryptionValue = decryption(jsonForDecrypt);
      console.log(decryptionValue);
      setDecrypted(decryptionValue);
    } catch (error) {
      setDecrypted(error.message);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8 space-y-3">
      <div>
        <form className="form-control" onSubmit={handleSubmit(submitData)}>
          <Label htmlFor="decryption_text">Input Encryptd Text</Label>
          <Textarea name="decryption_text" {...register("decryption_text")} />
          {errors.decryption_text && (
            <AlertInput message={errors.decryption_text.message} />
          )}
          <div>
            <span className="text-xs text-gray-500">
              Input text encrypted in here to decrypt 🔓
            </span>
          </div>
          <Label>Input Key :</Label>
          <Input {...register("secret_key")} />
          {errors.secret_key && (
            <AlertInput message={errors.secret_key.message} />
          )}
          <br />
          <Button>Decrypt</Button>
        </form>
      </div>
      <div>
        <form className="form-control">
          <Label htmlFor="decrypt_text">
            <p>Decrypted Text</p>
          </Label>
          <Textarea name="decrypt_text" value={decrypted} />
        </form>
      </div>
    </div>
  );
}
