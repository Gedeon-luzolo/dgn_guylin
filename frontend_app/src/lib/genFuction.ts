import { url } from "@/hooks/useCrud";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

export const formatDate = (date: Date) => {
  return format(new Date(date), "d MMMM yyyy", { locale: fr });
};

export const getImageUrl = (imagePath: string) => {
  if (!imagePath) return "";
  return imagePath.startsWith("http")
    ? imagePath
    : `${url}/uploads/${imagePath}`;
};

// export const getImageOneUrl = (user: string) => {
// return {`${url}/uploads/${user.photo}`}
// };
