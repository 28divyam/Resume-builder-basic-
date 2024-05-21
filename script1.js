function addSection() {
    const selectedSection = document.getElementById("section-select").value;
    const section = document.createElement("div");
    section.classList.add("section");

    const sectionHeading = document.createElement("h3");
    sectionHeading.innerText = selectedSection;

    const sectionControls = document.createElement("div");
    sectionControls.classList.add("section-controls");
    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.onclick = function () {
        section.remove();
    };
    sectionControls.appendChild(deleteButton);

    let sectionContent = "";
    switch (selectedSection) {
        case "Education":
            sectionContent += `<label for="${selectedSection}-institution">Institution:</label>`;
            sectionContent += `<input type="text" name="${selectedSection}-institution" required>`;
            sectionContent += `<label for="${selectedSection}-degree">Degree:</label>`;
            sectionContent += `<input type="text" name="${selectedSection}-degree" required>`;
            sectionContent += `<label for="${selectedSection}-startDate">Start Date:</label>`;
            sectionContent += `<input type="date" name="${selectedSection}-startDate" required>`;
            sectionContent += `<label for="${selectedSection}-endDate">End Date (optional):</label>`;
            sectionContent += `<input type="date" name="${selectedSection}-endDate">`;
            break;
        case "Work Experience":
            sectionContent += `<label for="${selectedSection}-company">Company:</label>`;
            sectionContent += `<input type="text" name="${selectedSection}-company" required>`;
            sectionContent += `<label for="${selectedSection}-title">Title:</label>`;
            sectionContent += `<input type="text" name="${selectedSection}-title" required>`;
            sectionContent += `<label for="${selectedSection}-startDate">Start Date:</label>`;
            sectionContent += `<input type="date" name="${selectedSection}-startDate" required>`;
            sectionContent += `<label for="${selectedSection}-endDate">End Date (optional):</label>`;
            sectionContent += `<input type="date" name="${selectedSection}-endDate">`;
            sectionContent += `<label for="${selectedSection}-description">Description:</label>`;
            sectionContent += `<textarea name="${selectedSection}-description"></textarea>`;
            break;
        case "Skills":
            sectionContent += `<ul id="${selectedSection}-list"></ul>`;
            const addSkillButton = document.createElement("button");
            addSkillButton.innerText = "Add Skill";
            addSkillButton.type = "button";
            addSkillButton.onclick = function () {
                const skillInput = document.createElement("input");
                skillInput.type = "text";
                skillInput.placeholder = "Enter Skill";
                skillInput.name = `${selectedSection}-skill`;
                const skillList = document.getElementById(`${selectedSection}-list`);
                skillList.appendChild(skillInput);
            };
            sectionControls.appendChild(addSkillButton);
            break;
        case "Awards":
            sectionContent += `<ul id="${selectedSection}-list"></ul>`;
            const addAwardButton = document.createElement("button");
            addAwardButton.innerText = "Add Award";
            addAwardButton.type = "button";
            addAwardButton.onclick = function () {
                const awardInput = document.createElement("input");
                awardInput.type = "text";
                awardInput.placeholder = "Enter Award";
                awardInput.name = `${selectedSection}-award`;
                const awardList = document.getElementById(`${selectedSection}-list`);
                awardList.appendChild(awardInput);
            };
            sectionControls.appendChild(addAwardButton);
            break;
    }

    section.innerHTML += sectionContent;
    section.appendChild(sectionControls);
    document.getElementById("sections").appendChild(section);
}

function previewResume() {
    const resumePreview = document.getElementById("resumePreview");
    resumePreview.innerHTML = "";

    const formData = new FormData(document.getElementById("resumeForm"));

    // Display uploaded image
    const imageFile = document.getElementById("image").files[0];
    if (imageFile) {
        const imageUrl = URL.createObjectURL(imageFile);
        const image = document.createElement("img");
        image.src = imageUrl;
        image.alt = "Profile Image";
        image.style.maxWidth = "150px"; // Adjust as needed
        image.style.maxHeight = "200px"; // Adjust as needed
        image.style.display = "block"; // Ensure the image is displayed as a block element
        resumePreview.appendChild(image);
    }

    // Display profile links
    const githubLink = formData.get("github");
    if (githubLink) {
        const github = document.createElement("a");
        github.href = githubLink;
        github.innerText = "GitHub Profile";
        github.target = "_blank"; // Open link in a new tab
        resumePreview.appendChild(github);
    }

    const linkedinLink = formData.get("linkedin");
    if (linkedinLink) {
        const linkedin = document.createElement("a");
        linkedin.href = linkedinLink;
        linkedin.innerText = "LinkedIn Profile";
        linkedin.target = "_blank"; // Open link in a new tab
        resumePreview.appendChild(linkedin);
    }

    // Display name, email, and phone number
    const name = formData.get("name");
    const email = formData.get("email");
    const phone = formData.get("phone");
    if (name || email || phone) {
        const personalInfo = document.createElement("div");
        if (name) {
            const namePara = document.createElement("p");
            namePara.innerText = `Name: ${name}`;
            personalInfo.appendChild(namePara);
        }
        if (email) {
            const emailPara = document.createElement("p");
            emailPara.innerText = `Email: ${email}`;
            personalInfo.appendChild(emailPara);
        }
        if (phone) {
            const phonePara = document.createElement("p");
            phonePara.innerText = `Phone: ${phone}`;
            personalInfo.appendChild(phonePara);
        }
        resumePreview.appendChild(personalInfo);
    }

    // Create a section container
    const sectionContainer = document.createElement("div");
    resumePreview.appendChild(sectionContainer);

    // Create a map to group related form data
    const sectionData = {
        Education: [],
        "Work Experience": [],
        Skills: [],
        Awards: []
    };

    for (let [key, value] of formData.entries()) {
        if (key === 'image' || key === 'github' || key === 'linkedin') continue;

        const [section, field] = key.split('-');
        if (sectionData[section]) {
            sectionData[section].push({ field, value });
        }
    }

    for (const [section, items] of Object.entries(sectionData)) {
        if (items.length > 0) {
            const sectionHeading = document.createElement("h3");
            sectionHeading.innerText = section;
            sectionHeading.style.fontWeight = "bold";
            sectionContainer.appendChild(sectionHeading);

            if (section === "Education" || section === "Work Experience") {
                const sectionItems = items.reduce((acc, item) => {
                    const { field, value } = item;
                    if (!acc[field]) {
                        acc[field] = value;
                    } else {
                        acc[field] += `, ${value}`;
                    }
                    return acc;
                }, {});

                const sectionContent = document.createElement("p");
                const fields = Object.keys(sectionItems);
                const content = fields.map(field => `${field.charAt(0).toUpperCase() + field.slice(1)}: ${sectionItems[field]}`).join('<br>');
                sectionContent.innerHTML = content;
                sectionContainer.appendChild(sectionContent);
            } else if (section === "Skills" || section === "Awards") {
                const sectionList = document.createElement("ul");
                items.forEach(item => {
                    const listItem = document.createElement("li");
                    listItem.innerText = item.value;
                    sectionList.appendChild(listItem);
                });
                sectionContainer.appendChild(sectionList);
            }
        }
    }
}

function downloadPDF() {
    const element = document.getElementById('resumePreview');
    html2pdf().from(element).save('resume.pdf');
}
