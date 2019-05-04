import React, { Component, Fragment } from 'react';
import { Button, ToastContainer, toast } from 'mdbreact';

export default function Notification(message) {
  if (!message) {
    return null;
  }
  toast.success("✔" + message, {
    position: "top-right",
  });
}
