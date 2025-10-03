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
import { UAParser } from "ua-parser-js";
import geoip from "geoip-lite";
import axios from "axios";

export const captureDevice = async (req, res, next) => {
  try {
    const ip =
      req.headers["x-forwarded-for"]?.split(",")[0] || req.socket.remoteAddress;

    const parser = new UAParser(req.headers["user-agent"]);
    const ua = parser.getResult();

    const geop = geoip.lookup(ip);
    // Fetch location data from free API
    let geo = null;
    try {
      // const resp = await fetch(`https://ipwho.is/${ip}`);
      // const resp = await fetch(`http://ip-api.com/json/${ip}`);
      // console.log(await resp.json())
      // const respo = await fetch(`https://ipapi.co/json/`);
      // const respo = await fetch(`https://api.ipwho.org/me`);
      const respo = await axios.get(`https://api.ipwho.org/me`);
      geo = await respo.data.data;
      console.log(geo);
    } catch (err) {
      console.warn("IP lookup failed:", err.message);
    }

    req.deviceInfo = {
      deviceId: uuidv4(),
      deviceType: ua.device.type || "desktop",
      browser: ua.browser.name || "Unknown",
      vendor: ua.device.vendor || "Unknown Vendor",
      model: ua.device.model || "Unknown Model",
      os: `${ua.os.name || "Unknown OS"} ${ua.os.version || ""}`,
      ip,
      location: geo
        ? {
            continent: geo.continent || "Unknown",
            country: geo.country || "Unknown",
            country_code: geo.countryCode || "Unknown",
            region: geo.region || "Unknown",
            city: geo.city || "Unknown",
            timezone: geo.timezone.time_zone || "Unknown",
            mobile_network: geo.connection.org || "Unknown",
            latitude: geo.latitude || null,
            longitude: geo.longitude || null,
            calling_code: geo.dial_code || "Unknown",
            utc: geo.timezone.utc || "Unknown",
            ip: geo.ip || "Unknown",
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
