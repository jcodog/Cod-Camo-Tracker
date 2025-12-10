export interface BaseEmailProps {
  preview: string;
  title: string;
  body: string;
  action?: {
    label: string;
    href: string;
  };
}

export const renderBaseTemplate = ({
  preview,
  title,
  body,
  action,
}: BaseEmailProps) => {
  const actionMarkup = action
    ? `<tr>
        <td align="center" style="padding-top:24px">
          <a href="${action.href}" style="display:inline-block;background-color:#2563eb;color:#fff;padding:12px 24px;border-radius:9999px;text-decoration:none;font-weight:600;font-family:'Inter',Helvetica,Arial,sans-serif;">
            ${action.label}
          </a>
        </td>
      </tr>`
    : "";

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charSet="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${title}</title>
  </head>
  <body style="margin:0;padding:0;background:#0b1120;color:#e2e8f0;font-family:'Inter',Helvetica,Arial,sans-serif;">
    <table role="presentation" width="100%" cellPadding="0" cellSpacing="0" style="background:#0b1120;padding:24px 0;">
      <tr>
        <td>
          <table role="presentation" width="100%" cellPadding="0" cellSpacing="0" style="max-width:480px;margin:0 auto;background:#111827;border-radius:24px;padding:32px 28px;border:1px solid rgba(255,255,255,0.05);">
            <tr>
              <td style="padding-bottom:16px;color:#94a3b8;font-size:14px;">${preview}</td>
            </tr>
            <tr>
              <td style="font-size:22px;font-weight:600;color:#f8fafc;">${title}</td>
            </tr>
            <tr>
              <td style="padding-top:16px;line-height:1.7;color:#cbd5f5;font-size:15px;">${body}</td>
            </tr>
            ${actionMarkup}
            <tr>
              <td style="padding-top:32px;font-size:12px;color:#64748b;border-top:1px solid rgba(255,255,255,0.05);padding-top:24px;margin-top:32px;">
                You are receiving this email because your Cod Camo Tracker account triggered a notification.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
};
