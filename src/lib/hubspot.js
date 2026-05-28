const PORTAL_ID = "148584326";
const FORM_GUID = "ef346a9d-c0ce-4102-9bd9-2c8862586e84";
const REGION = "eu1";

const ENDPOINT = `https://api-${REGION}.hsforms.com/submissions/v3/integration/submit/${PORTAL_ID}/${FORM_GUID}`;

function splitName(fullName) {
  const parts = fullName.trim().split(/\s+/);
  const firstname = parts.shift() || "";
  const lastname = parts.join(" ");
  return { firstname, lastname };
}

export async function submitContactToHubSpot(form) {
  const { firstname, lastname } = splitName(form.name);

  const fields = [
    { name: "firstname", value: firstname },
    { name: "lastname", value: lastname },
    { name: "email", value: form.email },
    { name: "phone", value: form.phone },
    { name: "company", value: form.company },
    { name: "service_of_interest", value: form.service },
    { name: "message", value: form.message },
  ].filter((f) => f.value);

  const payload = {
    fields,
    context: {
      pageUri: typeof window !== "undefined" ? window.location.href : "",
      pageName: typeof document !== "undefined" ? document.title : "",
    },
  };

  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`HubSpot submission failed (${res.status}): ${detail}`);
  }

  return res.json();
}
