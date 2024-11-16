import { useEffect, useState } from "react";

export enum AlertType {
  SUCCESS = 1,
  ERROR = 2,
}

export type Alert = {
  alert_type: AlertType;
  message: string;
  emitted_at: Date;
}

export default function AlertBox({alert}: {alert: Alert}) {

  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
    console.log(alert.message);
    if (alert.message !== "" && !show) {
      setShow(true);
      setTimeout(() => {
        setShow(false);
      }, 10000);
    }
  }, [alert.emitted_at]);

  function alertColor() {
    if (alert.alert_type === AlertType.SUCCESS) return "bg-green-600";
    return "bg-red-600";
  }

  return show ? <div className={`fixed z-20 bottom-3 right-3 p-3 rounded-xl min-w-80 max-w-screen-md ${alertColor()}`}>
    {alert.message}
  </div> : null
}