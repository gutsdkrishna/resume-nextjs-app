This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

```
resume-nextjs-app
├─ README.md
├─ eslint.config.mjs
├─ next.config.ts
├─ package-lock.json
├─ package.json
├─ postcss.config.mjs
├─ public
│  ├─ cv.png
│  ├─ example.jpg
│  ├─ file.svg
│  ├─ globe.svg
│  ├─ logo.svg
│  ├─ next.svg
│  ├─ upload-cv.png
│  ├─ vercel.svg
│  ├─ vite.svg
│  └─ window.svg
├─ src
│  ├─ App.css
│  ├─ App.jsx
│  ├─ app
│  │  ├─ ClientLayout.tsx
│  │  ├─ api
│  │  │  ├─ convert-pdf-to-image
│  │  │  │  └─ route.js
│  │  │  ├─ extract-cv-info
│  │  │  │  ├─ example-route.ts
│  │  │  │  └─ route.js
│  │  │  └─ user-resumes
│  │  │     ├─ [id]
│  │  │     │  └─ route.js
│  │  │     └─ route.js
│  │  ├─ auth
│  │  │  └─ sign-in
│  │  │     └─ page.tsx
│  │  ├─ dashboard
│  │  │  ├─ page.tsx
│  │  │  └─ resume
│  │  │     └─ [resumeId]
│  │  │        └─ edit
│  │  │           └─ page.tsx
│  │  ├─ favicon.ico
│  │  ├─ globals.css
│  │  ├─ layout.tsx
│  │  ├─ my-resume
│  │  │  └─ [resumeId]
│  │  │     └─ view
│  │  │        ├─ ViewResume.jsx
│  │  │        └─ page.tsx
│  │  └─ page.tsx
│  ├─ assets
│  │  └─ react.svg
│  ├─ auth
│  │  └─ sign-in
│  │     └─ index.jsx
│  ├─ components
│  │  ├─ custom
│  │  │  └─ Header.jsx
│  │  └─ ui
│  │     ├─ alert-dialog.jsx
│  │     ├─ button.jsx
│  │     ├─ dialog.jsx
│  │     ├─ dropdown-menu.jsx
│  │     ├─ input.jsx
│  │     ├─ popover.jsx
│  │     ├─ sonner.jsx
│  │     └─ textarea.jsx
│  ├─ context
│  │  └─ ResumeInfoContext.jsx
│  ├─ dashboard
│  │  ├─ components
│  │  │  ├─ AddResume.jsx
│  │  │  ├─ ResumeCardItem.jsx
│  │  │  └─ UploadCVBox.jsx
│  │  ├─ index.jsx
│  │  └─ resume
│  │     ├─ Template-1.jsx
│  │     ├─ Template-2.jsx
│  │     ├─ [resumeId]
│  │     │  └─ edit
│  │     │     └─ index.jsx
│  │     └─ components
│  │        ├─ FormSections.jsx
│  │        ├─ ResumePreview.jsx
│  │        ├─ ThemeColor.jsx
│  │        ├─ forms
│  │        │  ├─ Education.jsx
│  │        │  ├─ Experience.jsx
│  │        │  ├─ PersonalDetail.jsx
│  │        │  ├─ RichTextEditor.jsx
│  │        │  ├─ Skills.jsx
│  │        │  └─ Summery.jsx
│  │        └─ preview
│  │           ├─ EducationalPreview.jsx
│  │           ├─ ExperiencePreview.jsx
│  │           ├─ PersonalDetailsPreview.jsx
│  │           ├─ SkillsPreview.jsx
│  │           └─ SummaryPreview.jsx
│  ├─ data
│  │  └─ dummy.jsx
│  ├─ home
│  │  └─ index.jsx
│  ├─ index.css
│  ├─ lib
│  │  ├─ mongoose.js
│  │  └─ utils.js
│  ├─ main.jsx
│  ├─ middleware.js
│  ├─ models
│  │  └─ Resume.js
│  ├─ my-resume
│  │  └─ [resumeId]
│  │     └─ view
│  │        └─ index.jsx
│  └─ service
│     ├─ AIModel.js
│     └─ GlobalApi.js
├─ structure.txt
└─ tsconfig.json

```