const cardsContainer = document.getElementById('cards-container');
const projectForm = document.getElementById('project-form');
const deleteForm = document.getElementById('delete-form');

const LOCAL_KEY = 'projects';

function renderProjects(projects) {
    cardsContainer.innerHTML = '';

    projects.forEach(p => {
        const card = document.createElement("project-card");

        // image
        const image = document.createElement("picture");
        image.slot = "image";
        image.innerHTML = `
        <img width=50% src="${p.image[0]}" alt="${p.image[1]}" />
        `;
        card.appendChild(image);

        // title
        const title = document.createElement("span");
        title.slot = "title";
        title.textContent = p.title;
        card.appendChild(title);

        // description
        const description = document.createElement("span");
        description.slot = "description";
        description.innerHTML = `
        <i>${p.details[0]}</i> · ${p.details[1]}
        <br>
        <em>${p.details[2]}</em>
        `;
        card.appendChild(description);

        // link
        const link = document.createElement("a");
        link.slot = "link";
        link.href = p.link;
        link.target = '_blank';
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

        cardsContainer.appendChild(card);
    });
}

function loadLocal() {
    const projects = JSON.parse(localStorage.getItem(LOCAL_KEY) || '[]');
    renderProjects(projects);
}

function saveLocal(projects) {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(projects));
}

// CREATE
document.getElementById('create-form').addEventListener('submit', e => {
    e.preventDefault();
    const projects = JSON.parse(localStorage.getItem(LOCAL_KEY) || '[]');
    const formData = new FormData(e.target);
    const project = {
        title: formData.get('title'),
        details: formData.get('details').split(',').map(s => s.trim()),
        image: [formData.get('image'), formData.get('imageAlt')],
        link: formData.get('link'),
        bullets: formData.get('bullets').split(',').map(s => s.trim())
    };
    projects.push(project);
    saveLocal(projects);
    renderProjects(projects);
    e.target.reset();
});

// UPDATE
document.getElementById('update-form').addEventListener('submit', e => {
    e.preventDefault();

    const projects = JSON.parse(localStorage.getItem(LOCAL_KEY) || '[]');
    const formData = new FormData(e.target);
    const index = parseInt(formData.get('index'));

    if (index >= 0 && index < projects.length) {
        const project = projects[index];
        const updates = {};

        // only add field if filled out
        function addIfFilled(key, value) {
            if (value !== null && value !== '' && value !== undefined) {
                updates[key] = value;
            }
        }

        // title
        addIfFilled('title', formData.get('title'));

        // details
        const detailsRaw = formData.get('details');
        if (detailsRaw) {
            updates.details = detailsRaw.split(',').map(s => s.trim());
        }

        // image
        const img = formData.get('image');
        const imgAlt = formData.get('imageAlt');
        if (img || imgAlt) {
            // require img and alt to update
            updates.image = [
                img || project.image[0],
                imgAlt || project.image[1]
            ];
        }

        // link
        addIfFilled('link', formData.get('link'));

        // bullets
        const bulletsRaw = formData.get('bullets');
        if (bulletsRaw) {
            updates.bullets = bulletsRaw.split(',').map(s => s.trim());
        }

        // update existing project
        projects[index] = {
            ...project,
            ...updates
        };

        saveLocal(projects);
        renderProjects(projects);
        e.target.reset();
    } else {
        alert('Invalid index');
    }
});


// DELETE
deleteForm.addEventListener('submit', e => {
    e.preventDefault();
    const projects = JSON.parse(localStorage.getItem(LOCAL_KEY) || '[]');
    const index = parseInt(deleteForm.deleteIndex.value);
    if (index >= 0 && index < projects.length) {
        projects.splice(index, 1);
        saveLocal(projects);
        renderProjects(projects);
    }
});

document.getElementById('load-local').addEventListener('click', loadLocal);
