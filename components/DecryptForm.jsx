import { useForm } from "react-hook-form";
import { decryption } from "@/utils/encrypt-invoice";
import { useState } from "react";
import { decryptSchema } from "@/utils/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import AlertInput from "./AlertInput";

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
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8">
      <div>
        <form className="form-control" onSubmit={handleSubmit(submitData)}>
            <label className="label">Encryptd Text</label>
            <textarea className="textarea textarea-secondary" {...register("decryption_text")} />
            {errors.decryption_text && (
              <AlertInput message={errors.decryption_text.message} />
            )}
            <div className="lebel">
              <span className="label-text-alt text-slate-500">Input text encrypted in here to decrypt 🔓</span>
            </div>
            <label className="label">Private Key :</label>
            <input className="input input-sm input-secondary" {...register("secret_key")} />
            {errors.secret_key && (
              <AlertInput message={errors.secret_key.message} />
            )}
            <br />
            <button className="btn btn-sm bg-orange-500">
              Decrypt
            </button>
        </form>
      </div>
      <div>
        <form className="form-control">
          <label className="label" htmlFor="decrypt_text">
            <p>Decrypted Text</p>
          </label>
          <textarea
            name="decrypt_text"
            className="textarea textarea-secondary"
            value={decrypted}
          />
        </form>
      </div>
    </div>
  );
}
