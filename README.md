# Elementor Hosting Connect - Domain Guides

This repository contains domain configuration guides for hosting providers that integrate with Elementor Hosting Connect. These guides help users configure their domains correctly when using different hosting providers with Elementor.

## 📖 About

Elementor Hosting Connect allows hosting providers to integrate their services with Elementor's ecosystem. This repository specifically handles domain configuration guides that are displayed to users when they need to connect their domains.

## 🤝 Adding Your Hosting Provider

If you're a hosting provider looking to integrate with Elementor Hosting Connect, follow these steps to add your domain configuration guides:

### 1. Create Provider Guide

Create a new JSON file in the appropriate provider directory under `src/`. Example structure:

```json
{
    "version": "1",
    "steps": {
        "intro": {
            "dashboardUrl": "https://your-dashboard.com",
            "visual": {
                "type": "image",
                "src": "logo.png"
            }
        },
        "dns": {
            "instructions": [
                "Log in to your dashboard",
                "Navigate to DNS settings",
                "Additional steps..."
            ],
            "visual": {
                "type": "image",
                "src": "dns-settings.png"
                // or
                "type": "video",
                "src": "https://youtube.com/your-guide-video"
            }
        }
    }
}
```

### 2. Guide Structure Requirements

#### Required Fields
- `version`: Guide version number
- `steps`: Object containing guide sections
  - `intro`: Initial setup information
    - `dashboardUrl`: Direct link to your platform's dashboard
    - `visual`: Logo or intro image/video
  - `dns`: DNS configuration steps
    - `instructions`: Array of step-by-step instructions
    - `visual`: Supporting image or video guide

#### Visual Support Options
1. **Images**
   ```json
   "visual": {
       "type": "image",
       "src": "path-to-image.png"
   }
   ```
2. **Videos**
   ```json
   "visual": {
       "type": "video",
       "src": "video-url"
   }
   ```

### 3. File Organization

Place your guide in the correct location:
```
src/
├── cloudflare/
│   └── guide.json
│   └── assets/
│       └── logo.png
├── your-provider/
│   └── guide.json
│   └── assets/
│       └── logo.png
```

### 4. Guidelines for Great Guides

1. **Clear Instructions**
   - Write concise, numbered steps
   - Include exact menu paths and button names
   - Specify any important settings or toggles

2. **Visual Content**
   - Provide high-quality logo
   - Include either screenshots or video tutorials
   - Ensure visuals match current interface

3. **Dashboard Access**
   - Include direct dashboard URL
   - Specify any required permissions or account types
   - Note any regional restrictions

## 🔍 Quality Checklist

- [ ] Version number is specified
- [ ] Dashboard URL is valid and accessible
- [ ] Instructions are clear and sequential
- [ ] Visual assets are provided (logo, screenshots, or video)
- [ ] JSON structure matches required format
- [ ] All paths and URLs are correct

## 🆘 Support

Need assistance? Here's how to get help:

1. **Technical Questions**
   - Open an issue in this repository
   - Tag it with `provider-integration`

2. **Provider Integration Support**
   - Email: provider-support@elementor.com
   - Include your provider name and specific questions

## 📜 License

This project is licensed under the [MIT License](LICENSE).

---

Built with ❤️ by Elementor