import { useSession } from "next-auth/react";
import { FC } from "react";

export interface AdminOnlyProps {
  children?: React.ReactNode;
}

const AdminOnly: FC<AdminOnlyProps> = ({ children }) => {
  const { data: session } = useSession();
  if (session?.user.admin) return <>{children}</>;
  return null;
};

export default AdminOnly;
