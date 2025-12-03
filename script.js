const root = document.documentElement;
const toggleBtn = document.getElementById("theme-toggle");

// Ordered cycle of themes
const themes = ["light", "dark", "fun"];

// Load saved theme or fallback to light
let currentTheme = localStorage.getItem("theme") || "light";
applyTheme(currentTheme);

toggleBtn.addEventListener("click", () => {
    // Find current index
    const index = themes.indexOf(currentTheme);
    // Get next index (wrap around)
    const nextIndex = (index + 1) % themes.length;
    currentTheme = themes[nextIndex];

    applyTheme(currentTheme);
    localStorage.setItem("theme", currentTheme);
});

function applyTheme(theme) {
    // Remove any theme classes
    root.classList.remove("light", "dark", "fun");

    // Add the current theme class (except light)
    if (theme !== "light") {
        root.classList.add(theme);
    }
}

// Set local storage
const localData = [
  {
    title: "Amazon Co.",
    details: ["Seattle, WA", "Jun 2025 – Sep 2025", "Software Development Engineer Intern"],
    image: ["../assets/amazon-logo.png", "Amazon logo with smile"],
    link: "https://www.amazon.jobs/en/jobs/3116030/software-development-engineer-internship-summer-2026-us",
    bullets: [
      "Developed a full-stack payment registration feature reducing API calls by 50%.",
      "Built responsive TypeScript/React components for billing workflows.",
      "Implemented secure backend services integrating with Address APIs.",
      "Delivered an A/B tested feature deployed to Amazon’s EU marketplace."
    ]
  },
  {
    title: "Palomar Insurance",
    details: ["La Jolla, CA", "Jun 2023 - Aug 2023", "Technology Operations Intern"],
    image: ["../assets/plmr-logo.png", "Image of palomar insurance logo, a mountain with palomar text"],
    link: "https://plmr.com/about/",
    bullets: [
      "Developed and deployed a chatbot for internal company use and integration with Microsoft Teams, leveraging Azure OpenAI GPT-4 on company-specific data.",
      "Integrated Service Desk Plus API into MS Teams, enabling users to search or create support requests.",
      "Led cross-functional meetings and presented updates demonstrating how OpenAI API streamlined access to institutional knowledge.",
      "Created system admin documentation and user guides ensuring scalability and maintainability."
    ]
  },
  {
    title: "Lightedge Solutions",
    details: ["San Diego, CA", "Jul 2022 – Dec 2022", "Network Operations Intern"],
    image: ["../assets/lightedge-logo.png", "LightEdge Solutions logo"],
    link: "https://lightedge.com/our-story/",
    bullets: [
      "Conducted independent research on network monitoring tools used in datacenter operations. ",
      "Selected, implemented, and deployed pilot systems: SmokePing and Datadog, comparing performance to guide future deployment."
    ]
  }
];

localStorage.setItem("projects", JSON.stringify(localData));

document.getElementById("load-local").addEventListener("click", loadLocal);
document.getElementById("load-remote").addEventListener("click", loadRemote);

function loadLocal() {
  const data = JSON.parse(localStorage.getItem("projects"));
  if (!data) {
    alert("No local data found!");
    return;
  }
  renderProjects(data);
}

function renderProjects(projects) {
  const container = document.getElementById("projects-container");
  container.innerHTML = ""; // Clear previous cards

  projects.forEach(p => {
    const card = document.createElement("project-card");

    // Create a picture element for slotted image
    const pic = document.createElement("picture");
    pic.slot = "image";
    pic.innerHTML = `
      <img width=50% src="${p.image[0]}" alt="${p.image[1]}" />
    `;
    card.appendChild(pic);

    const title = document.createElement("span");
    title.slot = "title";
    title.textContent = p.title;
    card.appendChild(title);

    const description = document.createElement("span");
    description.slot = "description";
    description.innerHTML = `
      <i>${p.details[0]}</i> · ${p.details[1]}<br>
      <em>${p.details[2]}</em>
    `;
    card.appendChild(description);

    const link = document.createElement("a");
    link.slot = "link";
    link.href = p.link;
    link.textContent = "Read More";
    card.appendChild(link);

    // bullets
    const ul = document.createElement("ul");
    p.bullets.forEach(b => {
      const li = document.createElement("li");
      li.textContent = b;
      ul.appendChild(li);
    });

    card.appendChild(ul);

    container.appendChild(card);
  });
}
