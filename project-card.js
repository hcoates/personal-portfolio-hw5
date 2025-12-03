class ProjectCard extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: "open" });

        shadow.innerHTML = `
            <style>
                :host {
                    display: block;
                    background-color: var(--card-bg);
                    border: 3px solid var(--accent);
                    border-radius: var(--card-radius, 12px);
                    padding: 2rem;
                    box-shadow: 0 4px 8px var(--card-shadow);
                    margin: 1rem auto;
                    width: 100%;
                    text-align: center;
                    box-sizing: border-box;
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                    max-width: 600px;
                }

                :host(:hover) {
                    transform: scale(1.03);
                    box-shadow: var(--card-shadow);
                }

                .header {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    gap: 0.5rem;
                    margin-bottom: 1rem;
                }

                picture img,
                ::slotted(img[slot="image"]) {
                    width: 80px;
                    height: auto;
                    object-fit: contain;
                }

                h2 {
                    margin-top: 0;
                    font-family: 'Press Start 2P', monospace;
                    font-size: 1.1rem;
                }

                p,
                ul,
                ::slotted(p),
                ::slotted(ul) {
                    font-family: 'Roboto', sans-serif;
                    line-height: 1.5;
                    font-size: 0.9rem;
                    padding: 0;
                    margin: 0.5rem 0;
                }

                ul {
                    font-family: 'Roboto', sans-serif;
                    line-height: 1.5;
                    font-size: 0.9rem;
                }

                a {
                    color: var(--accent);
                    font-weight: bold;
                }
            </style>

            <div class="header">
                <picture>
                    <slot name="image"></slot>
                </picture>
                <h2>
                    <slot name="title"></slot>
                </h2>
            </div>

            <p>
                <slot name="description"></slot>
            </p>

            <!-- Extra content: ul, paragraphs, etc -->
            <slot></slot>

            <slot name="link"></slot>
        `;
    }
}

customElements.define("project-card", ProjectCard);
