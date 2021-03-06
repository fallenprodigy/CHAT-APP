import React, { useState } from "react";
import { Input, Button } from "@material-ui/core";
import { db, auth } from "../firebase";
import firebase from "firebase/compat/app";
import Chat from "./Chat";
import "firebase/compat/auth";

function SendMessage({ scroll }) {
  const [msg, setMsg] = useState("");

  async function sendMessage(e) {
    e.preventDefault();
    const { uid, photoURL } = auth.currentUser;

    await db.collection("messages").add({
      text: msg,
      photoURL,
      uid,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setMsg("");
    scroll.current.scrollIntoView({ behavior: "smooth" });
  }
  return (
    <>
      <div>
        <Button
          href="/"
          style={{
            width: "50%",
            fontSize: "15px",
            fontWeight: "555",
            margin: "-550px 5% 80px 50%",
            maxWidth: "200px",
            color: "red",
          }}
          type="submit"
        >
          Back
        </Button>
        <form onSubmit={sendMessage}>
          <div className="sendMsg">
            <Input
              style={{
                width: "78%",
                fontSize: "15px",
                fontWeight: "550",
                marginLeft: "5px",
                marginBottom: "-3px",
                color: "white",
              }}
              placeholder="Message..."
              type="text"
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
            />
            <Button
              style={{
                width: "18%",
                fontSize: "15px",
                fontWeight: "550",
                margin: "4px 5% -13px 5%",
                maxWidth: "200px",
                color: "red",
              }}
              type="submit"
            >
              Send
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}

export default SendMessage;
