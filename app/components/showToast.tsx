import toast, {
    ToastOptions as HotToastOptions,
    ToastPosition,
  } from "react-hot-toast";
  
  interface ToastOptions extends HotToastOptions {
    id?: string;
  }
  
  type ToastType = "success" | "error" | "loading" | "custom";
  
  type PropsType = {
    message: string;
    options?: ToastOptions;
    type?: ToastType;
  };
  
  const DEFAULT_OPTIONS: ToastOptions = {
    duration: 3000,
    position: "top-right" as ToastPosition,
  };
  
  const showToast = (props: PropsType) => {
    if (!props.message) {
      return;
    }
  
    const options: ToastOptions = {
      ...DEFAULT_OPTIONS,
      ...props.options,
    };
  
    switch (props.type) {
      case "success":
        toast.success(props.message, options);
        break;
      case "error":
        toast.error(props.message, options);
        break;
      case "loading":
        toast.loading(props.message, options);
        break;
      case "custom":
        toast(props.message, options);
        break;
      default:
        toast(props.message, options);
        break;
    }
  };
  
  export default showToast;
  