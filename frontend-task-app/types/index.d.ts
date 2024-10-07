declare interface IUser {
  id?: string | number;
  name?: string | undefined;
  email: string;
  password: string;
  role?: string | undefined;
}
declare interface IUserResponse {
  user: IUser;
  access_token: string;
  refresh_token: string;
  message: string;
}

interface ErrorDetail {
  code: string;
  message: string;
  path: string[];
}

declare interface ErrorResponseData {
  error?: string;
  success?: boolean;
  data?: ErrorDetail[];
  message?: string;
}

declare interface Option {
  label: string;
  value: string;
  icon?: React.ComponentType<{ className?: string }>;
  withCount?: boolean;
}

declare interface DataTableFilterField<TData> {
  label: string;
  value: keyof TData;
  placeholder?: string;
  options?: Option[];
}

declare interface DataTableFilterOption<TData> {
  id: string;
  label: string;
  value: keyof TData;
  options: Option[];
  filterValues?: string[];
  filterOperator?: string;
  isMulti?: boolean;
}

declare interface Tasks {
  data: Task[];
  message: string;
  statusCode: number;
}
declare interface TaskOne {
  data: Task;
  message: string;
  statusCode: number;
}

interface Task {
  id?: string;
  priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT";
  title: string;
  description: string;
  status: "PENDING" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";
  createdAt?: string;
  updatedAt?: string;
}

declare interface ForgetPassword {
  email: string;
}

declare interface ForgetPasswordresponse {
  message: string;
}
declare interface ResetPassword {
  password: string;
  token: string;
}
declare interface ResetPasswordResponse {
  data: IUser;
  message: string;
  statusCode: number;
}
// title: "Dashboard",
// href: "/",
// icon: <Home />,

declare interface menutItems {
  title: string;
  href: string;
  icon: ReactNode;
}
declare interface ProfileItem {
  label: string;
  href: string;
}

declare interface MobileMenuProps {
  menuItems: menutItems[];
  profileMenuItems: ProfileItem[];
}
declare interface sidebarProps {
  menuItems: menutItems[];
}
