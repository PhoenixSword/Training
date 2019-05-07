import { toast } from 'mdbreact';

export default function Notification(message) {
  if (!message) {
    return null;
  }
  toast.success("✔" + message, {
    position: "top-right",
  });
}
