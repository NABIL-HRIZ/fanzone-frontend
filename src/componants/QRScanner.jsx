import React, { useEffect, useRef, useState } from "react";
import jsQR from "jsqr";
import axios from "axios";

export default function QRScanner() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [status, setStatus] = useState("");
  const [text, setText] = useState("");
  const [result, setResult] = useState("");

  const token = localStorage.getItem("token"); 

  useEffect(() => {
  const video = videoRef.current;
  const canvas = canvasRef.current;
  const ctx = canvas.getContext("2d");
  let scanning = true;

  navigator.mediaDevices
    .getUserMedia({ video: { facingMode: "environment" } })
    .then((stream) => {
      video.srcObject = stream;
      video.setAttribute("playsinline", true);
      video.play();

      const tick = () => {
        if (!scanning) return;

        if (video.readyState === video.HAVE_ENOUGH_DATA) {
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const qr = jsQR(imageData.data, imageData.width, imageData.height);

          if (qr) {
            const scanned = qr.data;
            setText(scanned);
            setStatus("QR détecté !");

           
            scanning = false;
            stream.getTracks().forEach((track) => track.stop());

            
            handleScan(scanned);
            return;
          }
        }

        requestAnimationFrame(tick);
      };

      requestAnimationFrame(tick);
    })
    .catch((err) => {
      console.error(err);
      setStatus("Erreur caméra !");
    });

  return () => {
    scanning = false;
    if (video.srcObject) {
      video.srcObject.getTracks().forEach((track) => track.stop());
    }
  };
}, []);


  const handleScan = async (qrContent) => {
    try {
      let ticketId = null;

     
      if (qrContent.startsWith("{")) {
        const parsed = JSON.parse(qrContent);
        ticketId = parsed.ticket_id;
      } else {
    
        ticketId = qrContent;
      }

      if (!ticketId) {
        setResult("QR invalide (ticket_id manquant)");
        return;
      }

      const response = await axios.post(
        "http://localhost:8000/api/scans",
        { ticket_id: ticketId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setResult(response.data.message);
    } catch (error) {
      if (error.response) {
        setResult(error.response.data.message);
      } else {
        setResult("Erreur serveur");
      }
    }
  };

  return (
    <div>
      <h2>Scanner un Ticket (JS QR)</h2>

      <video ref={videoRef} style={{ width: 300 }} />
      <canvas ref={canvasRef} style={{ display: "none" }} />

      <p><b>Contenu QR :</b> {text}</p>
      <h3>Status: {status}</h3>
      <h3>Résultat Backend: {result}</h3>
    </div>
  );
}
