// // middleware/captureDevice.js
// import { v4 as uuidv4 } from "uuid";
// import UAParser from "ua-parser-js";
// import geoip from "geoip-lite";

// export const captureDevice = (req, res, next) => {
//   try {
//     // Get IP (works behind proxies too)
//     const ip =
//       req.headers["x-forwarded-for"]?.split(",")[0] || req.socket.remoteAddress;

//     // Parse user agent
//     const parser = new UAParser(req.headers["user-agent"]);
//     const ua = parser.getResult();

//     // Lookup location from IP
//     const geo = geoip.lookup(ip);

//     // Build device object to match your schema
//     req.deviceInfo = {
//       deviceId: uuidv4(),
//       deviceType: ua.device.type || "desktop", // 'mobile', 'tablet', 'desktop'
//       browser: ua.browser.name || "Unknown",
//       os: ua.os.name || "Unknown",
//       ipAddress: ip,
//       location: geo
//         ? {
//             country: geo.country || "Unknown",
//             region: geo.region || "Unknown",
//             city: geo.city || "Unknown",
//             latitude: geo.ll ? geo.ll[0] : null,
//             longitude: geo.ll ? geo.ll[1] : null,
//           }
//         : {
//             country: "Unknown",
//             region: "Unknown",
//             city: "Unknown",
//             latitude: null,
//             longitude: null,
//           },
//       lastLogin: new Date(),
//     };

//     next();
//   } catch (err) {
//     console.error("Device capture error:", err);
//     req.deviceInfo = null;
//     next();
//   }
// };


import fetch from "node-fetch";
import { v4 as uuidv4 } from "uuid";
import {UAParser} from "ua-parser-js";

export const captureDevice = async (req, res, next) => {
  try {
    const ip =
      req.headers["x-forwarded-for"]?.split(",")[0] || req.socket.remoteAddress;

    const parser = new UAParser(req.headers["user-agent"]);
    const ua = parser.getResult();

    // Fetch location data from free API
    let geo = null;
    try {
      // const resp = await fetch(`https://ipwho.is/${ip}`);
      const resp = await fetch(`http://ip-api.com/json/${ip}`);
      console.log(await resp.json())
      const respo = await fetch(`https://ipapi.co/json/`);      
      geo = await respo.json();
    } catch (err) {
      console.warn("IP lookup failed:", err.message);
    }

    req.deviceInfo = {
      deviceId: uuidv4(),
      deviceType: ua.device.type || "desktop",
      browser: ua.browser.name || "Unknown",
      os: ua.os.name || "Unknown",
      ip,
      location: geo
        ? {
            country: geo.country_name || "Unknown",
            country_code: geo.country_code || "Unknown",
            region: geo.region || "Unknown",
            city: geo.city || "Unknown",
            timezone: geo.timezone || "Unknown",
            mobile_network: geo.org || "Unknown",
            utc: geo.utc_offset || "Unknown",
            calling_code: geo.country_calling_code || "Unknown",
            latitude: geo.latitude || null,
            longitude: geo.longitude || null,
            ip: geo.ip || "Unknown",
            network: geo.network || "Unknown",
          }
        : {
            country: "Unknown",
            region: "Unknown",
            city: "Unknown",
            latitude: null,
            longitude: null,
          },
      lastLogin: new Date(),
    };

    next();
  } catch (err) {
    console.error("Device capture error:", err);
    req.deviceInfo = null;
    next();
  }
};
