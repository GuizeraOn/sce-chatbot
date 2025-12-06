import type { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Calistenia Elite",
  description: "Transforma tu cuerpo hoy",
};

import Script from "next/script";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${montserrat.variable} ${inter.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}

        {/* Clarity Tracking Code */}
        <Script id="clarity-script" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "ufs0ihg5ou");
          `}
        </Script>

        {/* Meta Pixel Code */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1557356202175593');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=1557356202175593&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>

        {/* UTM Tracking Code (Footer) */}
        <Script id="utm-tracking" strategy="lazyOnload">
          {`
            let prefix = ["https://payment.hotmart.com", "https://pay.hotmart.com"];

            function getParams() {
                let t = "",
                    e = window.top.location.href,
                    r = new URL(e);
                if (null != r) {
                    let a = r.searchParams.get("utm_source"),
                        n = r.searchParams.get("utm_medium"),
                        o = r.searchParams.get("utm_campaign"),
                        m = r.searchParams.get("utm_term"),
                        c = r.searchParams.get("utm_content"); - 1 !== e.indexOf("?") && (t = \`&sck=\${a}|\${n}|\${o}|\${m}|\${c}\`), console.log(t)
                }
                return t
            }
            
            // Initial run
            ! function() {
                var t = new URLSearchParams(window.location.search);
                t.toString() && document.querySelectorAll("a").forEach(function(e) {
                    for (let r = 0; r < prefix.length; r++) - 1 !== e.href.indexOf(prefix[r]) && (-1 === e.href.indexOf("?") ? e.href += "?" + t.toString() + getParams() : e.href += "&" + t.toString() + getParams())
                })
            }();

            console.log('%cScript de rastreamento de vendas desenvolvido pela Comunidade NOD - Dericson Calari e Samuel Choairy', 'font-size:20px;color:yellow;');
            
            // Observer for dynamic links (Chatbot Support)
            const observer = new MutationObserver((mutations) => {
                var t = new URLSearchParams(window.location.search);
                if (!t.toString()) return;
                
                mutations.forEach((mutation) => {
                    mutation.addedNodes.forEach((node) => {
                        if (node.nodeType === 1) { // Element
                             if (node.tagName === 'A') {
                                 checkLink(node, t);
                             }
                             // Check children
                             node.querySelectorAll && node.querySelectorAll('a').forEach(a => checkLink(a, t));
                        }
                    });
                });
            });
            
            function checkLink(e, t) {
                 for (let r = 0; r < prefix.length; r++) {
                     if (e.href.indexOf(prefix[r]) !== -1) {
                         // Avoid double tagging
                         if (e.href.includes("utm_source=")) return;
                         
                         if (e.href.indexOf("?") === -1) {
                             e.href += "?" + t.toString() + getParams();
                         } else {
                             e.href += "&" + t.toString() + getParams();
                         }
                     }
                 }
            }
            
            observer.observe(document.body, { childList: true, subtree: true });
          `}
        </Script>
      </body>
    </html>
  );
}
