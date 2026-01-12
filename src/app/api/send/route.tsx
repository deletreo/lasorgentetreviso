// import { NextResponse } from 'next/server';
// import { Resend } from 'resend';

// // TUA API KEY
// const resend = new Resend(process.env.RESEND_API_KEY);

// export async function POST(request: Request) {
//     try {
//         const body = await request.json();
//         const { nome, email, telefono, messaggio, prodotto, honeypot, formType } = body;

//         // 1. Controllo Anti-spam
//         if (honeypot && honeypot.length > 0) {
//             return NextResponse.json({ message: "Spam rilevato" }, { status: 400 });
//         }

//         const isConsumer = formType === 'consumer';
//         // Colori presi dallo stile del sito
//         const accentColor = isConsumer ? '#11414d' : '#856e4b'; 
//         const subjectPrefix = isConsumer ? '[INFO] Richiesta Info' : '[FRANCHISING] Candidatura Business';
//         const typeLabel = isConsumer ? 'RICHIESTA PRIVATO / AZIENDA' : 'PARTNER / BUSINESS';
        
//         const subject = prodotto 
//             ? `${subjectPrefix}: ${prodotto} - da ${nome}` 
//             : `${subjectPrefix} - da ${nome}`;

//         // 2. HTML "Dark Luxury" Style con Font Fix
//         const htmlContent = `
//         <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
//         <html xmlns="http://www.w3.org/1999/xhtml">
//         <head>
//             <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
//             <title>${subject}</title>
//             <style type="text/css">
//                 @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600&display=swap');
                
//                 body { 
//                     margin: 0; 
//                     padding: 0; 
//                     background-color: #000000; 
//                     font-family: 'Inter', Helvetica, Arial, sans-serif !important; 
//                 }
                
//                 /* Forziamo il font su tutti gli elementi di testo per compatibilità */
//                 p, h1, h2, h3, a, td, span, div {
//                     font-family: 'Inter', Helvetica, Arial, sans-serif !important;
//                 }
                
//                 a { color: ${accentColor}; text-decoration: none; }
//             </style>
//         </head>
//         <body style="background-color: #000000; margin: 0; padding: 40px 0;">
            
//             <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="background-color: #0a0a0a; border: 1px solid #222222; border-radius: 4px; overflow: hidden; font-family: 'Inter', Helvetica, Arial, sans-serif;">
                
//                 <tr>
//                     <td height="6" style="background-color: ${accentColor};"></td>
//                 </tr>

//                 <tr>
//                     <td style="padding: 40px 40px 20px 40px; text-align: center; border-bottom: 1px solid #1a1a1a;">
//                         <p style="margin: 0; color: #666666; font-size: 10px; text-transform: uppercase; letter-spacing: 4px; font-weight: bold;">La Sorgente Treviso</p>
//                         <h1 style="margin: 15px 0 0 0; color: #ffffff; font-size: 24px; text-transform: uppercase; letter-spacing: 2px; font-weight: 300;">${typeLabel}</h1>
//                         <p style="margin: 10px 0 0 0; color: #444444; font-size: 12px; font-style: italic;">Ricevuto il ${new Date().toLocaleDateString('it-IT')}</p>
//                     </td>
//                 </tr>

//                 <tr>
//                     <td style="padding: 40px;">

//                         ${prodotto ? `
//                         <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 35px;">
//                             <tr>
//                                 <td style="background-color: #111111; padding: 25px; border-left: 4px solid ${accentColor}; border-radius: 0 4px 4px 0;">
//                                     <p style="margin: 0 0 8px 0; color: ${accentColor}; font-size: 10px; text-transform: uppercase; letter-spacing: 2px; font-weight: bold;">Prodotto Selezionato</p>
//                                     <p style="margin: 0; color: #ffffff; font-size: 20px; font-weight: 400; letter-spacing: 0.5px;">${prodotto}</p>
//                                 </td>
//                             </tr>
//                         </table>
//                         ` : ''}

//                         <table width="100%" border="0" cellspacing="0" cellpadding="0">
//                             <tr>
//                                 <td width="50%" valign="top" style="padding-bottom: 30px;">
//                                     <p style="margin: 0 0 5px 0; color: #444444; font-size: 10px; text-transform: uppercase; letter-spacing: 2px; font-weight: bold;">Nome / Referente</p>
//                                     <p style="margin: 0; color: #dddddd; font-size: 16px; border-bottom: 1px solid #222222; padding-bottom: 10px; display: inline-block; min-width: 80%;">${nome}</p>
//                                 </td>
//                                 <br/>
//                                 <td width="50%" valign="top" style="padding-bottom: 30px;">
//                                     <p style="margin: 0 0 5px 0; color: #444444; font-size: 10px; text-transform: uppercase; letter-spacing: 2px; font-weight: bold;">Telefono</p>
//                                     <p style="margin: 0; color: #dddddd; font-size: 16px; border-bottom: 1px solid #222222; padding-bottom: 10px; display: inline-block; min-width: 80%;">${telefono || '<span style="color:#444;">N/D</span>'}</p>
//                                 </td>
//                             </tr>
//                             <tr>
//                                 <td colspan="2" valign="top" style="padding-bottom: 40px;">
//                                     <p style="margin: 0 0 5px 0; color: #444444; font-size: 10px; text-transform: uppercase; letter-spacing: 2px; font-weight: bold;">Email di Contatto</p>
//                                     <p style="margin: 0; color: #dddddd; font-size: 16px; border-bottom: 1px solid #222222; padding-bottom: 10px; display: block;">
//                                         <a href="mailto:${email}" style="color: #ffffff; text-decoration: none;">${email}</a>
//                                     </p>
//                                 </td>
//                             </tr>
//                         </table>

//                         <table width="100%" border="0" cellspacing="0" cellpadding="0">
//                             <tr>
//                                 <td>
//                                     <p style="margin: 0 0 10px 0; color: #444444; font-size: 10px; text-transform: uppercase; letter-spacing: 2px; font-weight: bold;">Messaggio / Note</p>
//                                     <div style="background-color: #0f0f0f; border: 1px solid #1a1a1a; padding: 25px; border-radius: 4px; color: #bbbbbb; font-size: 14px; line-height: 1.6; font-style: italic;">
//                                         ${messaggio ? messaggio.replace(/\n/g, '<br>') : '<span style="color:#444;">Nessun messaggio aggiuntivo inserito.</span>'}
//                                     </div>
//                                 </td>
//                             </tr>
//                         </table>

//                     </td>
//                 </tr>

//                 <tr>
//                     <td style="background-color: #080808; padding: 20px; text-align: center; border-top: 1px solid #1a1a1a;">
//                         <p style="margin: 0; color: #333333; font-size: 10px; text-transform: uppercase; letter-spacing: 3px;">Generato da La Sorgente Web</p>
//                         <p style="margin: 5px 0 0 0; color: #222222; font-size: 9px;">Non rispondere direttamente a questa email automatica se non necessario.</p>
//                     </td>
//                 </tr>

//             </table>
            
//             <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
//                 <tr><td height="40"></td></tr>
//             </table>

//         </body>
//         </html>
//         `;

//         // 3. Invio effettivo
//         const data = await resend.emails.send({
//             from: 'La Sorgente Web <onboarding@resend.dev>', 
//             to: ['lasorgenterichieste@gmail.com'], 
//             replyTo: email, 
//             subject: subject,
//             html: htmlContent, 
//         });

//         if (data.error) {
//             console.error("Resend Error:", data.error);
//             return NextResponse.json({ message: data.error.message }, { status: 500 });
//         }

//         return NextResponse.json({ message: "Email inviata con successo" }, { status: 200 });

//     } catch (error: any) {
//         console.error("Server Error:", error);
//         return NextResponse.json({ message: error.message || "Errore interno del server" }, { status: 500 });
//     }
// }