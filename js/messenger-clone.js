$(function () {
    const setCurrentTime = () => {
        let currentTime = new Date();
        let hours = currentTime.getHours() % 12;
        hours = String(hours).padStart(2, '0');
        if (hours == "00") {
            hours = 12; // Changes 00:xx to 12:xx
        }

        let mins = String(currentTime.getMinutes()).padStart(2, '0');

        let ampm = currentTime.getHours() >= 12 ? 'PM' : 'AM';

        $("#localTimeCounter").html(`${hours}:${mins} ${ampm}`);
    }

    setInterval(() => {
        setCurrentTime();
    }, 1);

    const getJsonData = () => {
        fetch("json/data.json")
            .then(response => response.json())
            .then((data) => {
                fillChatContainerWithData(data);
            })
            .catch(err => console.error("Error loading JSON:", err));
    }
    getJsonData();

    const fillChatContainerWithData = (data) => {

        let myName = $(".myName");
        let contactInformation = $("#contactInformation");
        let location = $("#location");

        console.log(data);

        myName.html(data.name);

        location.html(`<small>${data.location}</small>`);

        contactInformation.html("");
        $.each(data.contact, function (ind, val) {
            contactInformation.append(`
                     <div class="me-1"><small class="ex-small">${ind.substr(0, 1).toUpperCase() + ind.substr(1)} : ${val}</small></div>
                     `);
        });

        // Intro
        showTyping(`Hi! I’m ${data.name}, a full-stack developer 👋`);

        setTimeout(() => {
            showTyping(data.summary, 1500);
        }, 1500 + 500);

        // Languages
        setTimeout(() => {

            let languages = "";

            $.each(data.core_skills.languages, function (ind, val) {
                languages += `<li>✅ ${val}</li>`
            });

            showTyping(`
                    <div class="col-12 mb-1"><strong>Languages</strong></div><ul class="unordered-list"> ${languages} </ul>
                    `, 3000);
        }, 3000 + 500);

        // Framework and libraries
        setTimeout(() => {

            let frameworks_libraries = "";

            $.each(data.core_skills.frameworks_libraries, function (ind, val) {
                frameworks_libraries += `<li>✅ ${val}</li>`
            });

            showTyping(`
                    <div class="col-12 mb-1"><strong>Frameworks / Library</strong></div><ul class="unordered-list"> ${frameworks_libraries} </ul>
                    `, 4500);
        }, 4500 + 500);

        // Tools and platforms
        setTimeout(() => {

            let tools_platforms = "";

            $.each(data.core_skills.tools_platforms, function (ind, val) {
                tools_platforms += `<li>✅ ${val}</li>`
            });

            showTyping(`
                    <div class="col-12 mb-1"><strong>Platform / Tools</strong></div><ul class="unordered-list"> ${tools_platforms} </ul>
                    `, 6000);
        }, 6000 + 500);

        // Others
        setTimeout(() => {

            let other = "";

            $.each(data.core_skills.other, function (ind, val) {
                other += `<li>✅ ${val}</li>`
            });

            showTyping(`
                    <div class="col-12 mb-1"><strong>Others</strong></div><ul class="unordered-list"> ${other} </ul>
                    `, 7500);
        }, 7500 + 500);

        // Experiences
        setTimeout(() => {

            let exp = data.experience;
            let experience = "";


            $.each(exp, function (ind, val) {

                let responsibilities = "";

                $.each(val.responsibilities, function (idx, value) {
                    responsibilities += `<li>${value}</li>`;
                });

                experience += `
                        <div>
                        <label>💻 ${val.position} | ${val.company}</label>
                        </div>
                        <div>
                        <i><small>${val.years}</small></i>
                        </div>
                        <div>
                        Responsibilities
                        </div>
                        <ol>
                        ${responsibilities}
                        </ol>
                        `;
            });

            showTyping(`
                    <div>
                        <strong>
                            Experience    
                        </strong>
                        ${experience}    
                    </div>
                    `, 9000);
        }, 9000 + 500);

        // Projects
        setTimeout(() => {

            let exp = data.projects;
            let projects = "";


            $.each(exp, function (ind, val) {

                let highlights = "";

                $.each(val.highlights, function (idx, value) {
                    highlights += `<li>${value}</li>`;
                });

                let techStack = "";

                $.each(val.tech_stack, function (techind, techVal) {
                    techStack += `${techVal}, `;
                });

                let projectLink = (val.link) ?? "";
                let linkanchor = "";
                if (projectLink) {
                    linkanchor = `➡️ <a class="msg-achor" href="${projectLink}">${projectLink}</a>`;
                }
                projects += `
                        <div>
                            <label>🌐 ${val.name} </label>
                        </div>
                        <div>
                            ${linkanchor}
                        </div>
                        <div>
                            🧑‍💼 ${val.role}
                        </div>
                        <div>
                            ⚙️ ${techStack}
                        </div>
                        <div>
                            💡Highlights
                        </div>
                        <ol>
                            ${highlights}
                        </ol>
                        `;
            });

            showTyping(`
                    <div>
                        <strong>
                            Projects    
                        </strong>
                        ${projects}    
                    </div>
                    `, 12500);
        }, 12500 + 500);

        // Choices
        setTimeout(() => {

            let buttonsChoices = `
                <div class="d-flex flex-column justify-content-start gap-2">
                    <button class="btn-msg primary viewIntro"> Introduction </button>
                    <button class="btn-msg primary viewCoreSkills"> Core skills </button>
                    <button class="btn-msg primary viewExperience"> Experience </button>
                    <button class="btn-msg primary viewProjects"> Projects </button>
                    <button class="btn-msg primary viewEduc"> Education </button>
                </div>`;

            showTyping(`
                    <div>
                        ${buttonsChoices}    
                    </div>
                    `, 13000);
        }, 13000 + 500);


    }

    function showTyping(message, delay = 500) {
        const chatScroller = $("#chatContainer");
        // Change this line to use #chatContainer:
        chatScroller.append(`
            <div class="d-flex flex-row mb-3 typeingbubble">
                <div class="d-flex flex-column justify-content-end">
                    <div class="msg-image-small">
                        <img src="img/pic1.png"/>
                    </div>
                </div>
                <div>
                    <div class="chat-bubble typing"><div class="typing-indicator"><span></span><span></span><span></span></div></div>
                </div>
            </div>
            `);

        chatScroller.scrollTop(chatScroller[0].scrollHeight);
        // After delay, remove typing and show message
        setTimeout(() => {
            $(".typeingbubble").remove();
            // Change this line to use #chatContainer:
            chatScroller.append(`
            <div class="msg-container left mb-3">
                <div class="d-flex flex-column justify-content-end">
                    <div class="msg-image-small">
                        <img src="img/pic1.png"/>
                    </div>
                </div>
                <div class="msg">
                    ${message}
                </div>
            </div>
            `);

            chatScroller.scrollTop(chatScroller[0].scrollHeight);
        }, delay);
    }

    const fetchData = async () => {

        try {

            const response = await fetch('json/data.json');

            const result = await response.json();

            return result;

        } catch (error) {

            console.log(error);

            return false;
        }

    };
    $(document).on("click", ".viewIntro", function () {
        fetchData().then((result) => {

            if (!result) {

                return;
            }

            // Intro
            showTyping(`Hi! I’m ${result.name}, a full-stack developer 👋`);

            setTimeout(() => {
                showTyping(result.summary, 1500);
            }, 1500 + 500);

            // Choices
            setTimeout(() => {

                let d = result;

                let buttonsChoices = `
                <div class="d-flex flex-column justify-content-start gap-2">
                    <button class="btn-msg primary viewIntro"> Introduction </button>
                    <button class="btn-msg primary viewCoreSkills"> Core skills </button>
                    <button class="btn-msg primary viewExperience"> Experience </button>
                    <button class="btn-msg primary viewProjects"> Projects </button>
                    <button class="btn-msg primary viewEduc"> Education </button>
                </div>`;

                showTyping(`
                    <div>
                        ${buttonsChoices}    
                    </div>
                    `, 4000);
            }, 4000 + 500);

        });
    });

    $(document).on("click", ".viewCoreSkills", function () {
        fetchData().then((result) => {

            if (!result) {

                return;
            }

            const core_skills = result.core_skills;
            // Languages
            setTimeout(() => {

                let languages = "";

                $.each(core_skills.languages, function (ind, val) {
                    languages += `<li>✅ ${val}</li>`
                });

                showTyping(`
                    <div class="col-12 mb-1"><strong>Languages</strong></div><ul class="unordered-list"> ${languages} </ul>
                    `, 0);
            }, 0 + 500);

            // Framework and libraries
            setTimeout(() => {

                let frameworks_libraries = "";

                $.each(core_skills.frameworks_libraries, function (ind, val) {
                    frameworks_libraries += `<li>✅ ${val}</li>`
                });

                showTyping(`
                    <div class="col-12 mb-1"><strong>Frameworks / Library</strong></div><ul class="unordered-list"> ${frameworks_libraries} </ul>
                    `, 3000);
            }, 3000 + 500);

            // Tools and platforms
            setTimeout(() => {

                let tools_platforms = "";

                $.each(core_skills.tools_platforms, function (ind, val) {
                    tools_platforms += `<li>✅ ${val}</li>`
                });

                showTyping(`
                    <div class="col-12 mb-1"><strong>Platform / Tools</strong></div><ul class="unordered-list"> ${tools_platforms} </ul>
                    `, 6000);
            }, 6000 + 500);

            // Others
            setTimeout(() => {

                let other = "";

                $.each(core_skills.other, function (ind, val) {
                    other += `<li>✅ ${val}</li>`
                });

                showTyping(`
                    <div class="col-12 mb-1"><strong>Others</strong></div><ul class="unordered-list"> ${other} </ul>
                    `, 9000);
            }, 9000 + 500);

            // Choices
            setTimeout(() => {

                let d = result;

                let buttonsChoices = `
                <div class="d-flex flex-column justify-content-start gap-2">
                    <button class="btn-msg primary viewIntro"> Introduction </button>
                    <button class="btn-msg primary viewCoreSkills"> Core skills </button>
                    <button class="btn-msg primary viewExperience"> Experience </button>
                    <button class="btn-msg primary viewProjects"> Projects </button>
                    <button class="btn-msg primary viewEduc"> Education </button>
                </div>`;

                showTyping(`
                    <div>
                        ${buttonsChoices}    
                    </div>
                    `, 12000);
            }, 12000 + 500);
        });
    });

    $(document).on("click", ".viewExperience", function () {
        fetchData().then((result) => {

            if (!result) {

                return;
            }

            // Experiences
            setTimeout(() => {

                let exp = result.experience;
                let experience = "";


                $.each(exp, function (ind, val) {

                    let responsibilities = "";

                    $.each(val.responsibilities, function (idx, value) {
                        responsibilities += `<li>${value}</li>`;
                    });

                    experience += `
                        <div>
                        <label>💻 ${val.position} | ${val.company}</label>
                        </div>
                        <div>
                        <i><small>${val.years}</small></i>
                        </div>
                        <div>
                        Responsibilities
                        </div>
                        <ol>
                        ${responsibilities}
                        </ol>
                        `;
                });

                showTyping(`
                    <div>
                        <strong>
                            Experience    
                        </strong>
                        ${experience}    
                    </div>
                    `, 1000);
            }, 1000 + 500);

            // Choices
            setTimeout(() => {

                let d = result;

                let buttonsChoices = `
                <div class="d-flex flex-column justify-content-start gap-2">
                    <button class="btn-msg primary viewIntro"> Introduction </button>
                    <button class="btn-msg primary viewCoreSkills"> Core skills </button>
                    <button class="btn-msg primary viewExperience"> Experience </button>
                    <button class="btn-msg primary viewProjects"> Projects </button>
                    <button class="btn-msg primary viewEduc"> Education </button>
                </div>`;

                showTyping(`
                    <div>
                        ${buttonsChoices}    
                    </div>
                    `, 3000);
            }, 3000 + 500);
        });


    });

    // viewProjects
    $(document).on("click", ".viewProjects", function () {
        alert("Clicked");
        fetchData().then((result) => {

            console.log(result);

            if (!result) {

                return;
            }

            // Projects
            setTimeout(() => {

                let exp = result.projects;
                let projects = "";


                $.each(exp, function (ind, val) {

                    let highlights = "";

                    $.each(val.highlights, function (idx, value) {
                        highlights += `<li>${value}</li>`;
                    });

                    let techStack = "";

                    $.each(val.tech_stack, function (techind, techVal) {
                        techStack += `${techVal}, `;
                    });

                    let projectLink = (val.link) ?? "";
                    let linkanchor = "";
                    if (projectLink) {
                        linkanchor = `➡️ <a class="msg-achor" href="${projectLink}">${projectLink}</a>`;
                    }
                    projects += `
                        <div>
                            <label>🌐 ${val.name} </label>
                        </div>
                        <div>
                            ${linkanchor}
                        </div>
                        <div>
                            🧑‍💼 ${val.role}
                        </div>
                        <div>
                            ⚙️ ${techStack}
                        </div>
                        <div>
                            💡Highlights
                        </div>
                        <ol>
                            ${highlights}
                        </ol>
                        `;
                });

                showTyping(`
                    <div>
                        <strong>
                            Projects    
                        </strong>
                        ${projects}    
                    </div>
                    `, 1000);
            }, 1000 + 500);

            // Choices
            setTimeout(() => {

                let d = result;

                let buttonsChoices = `
                    <div class="d-flex flex-column justify-content-start gap-2">
                        <button class="btn-msg primary viewIntro"> Introduction </button>
                        <button class="btn-msg primary viewCoreSkills"> Core skills </button>
                        <button class="btn-msg primary viewExperience"> Experience </button>
                        <button class="btn-msg primary viewProjects"> Projects </button>
                        <button class="btn-msg primary viewEduc"> Education </button>
                    </div>`;

                showTyping(`
                    <div>
                        ${buttonsChoices}    
                    </div>
                    `, 4000);
            }, 4000 + 500);
        });
    });
    // viewEduc
    $(document).on("click", ".viewEduc", function () {

        alert("Clicked");

        fetchData().then((result) => {

            console.log(result);

            if (!result) {

                return;
            }

            let educ = result.education;
            // Education
            setTimeout(() => {

                showTyping(`
                    <div>
                        <strong>
                            Education    
                        </strong>
                    </div>
                    <div>
                        ${educ.school} | ${educ.degree}
                    </div>
                    <div>
                        ${educ.address}
                    </div>

                    `, 1000);
            }, 1000 + 500);

            // Choices
            setTimeout(() => {

                let d = result;

                let buttonsChoices = `
                    <div class="d-flex flex-column justify-content-start gap-2">
                        <button class="btn-msg primary viewIntro"> Introduction </button>
                        <button class="btn-msg primary viewCoreSkills"> Core skills </button>
                        <button class="btn-msg primary viewExperience"> Experience </button>
                        <button class="btn-msg primary viewProjects"> Projects </button>
                        <button class="btn-msg primary viewEduc"> Education </button>
                    </div>`;

                showTyping(`
                    <div>
                        ${buttonsChoices}    
                    </div>
                    `, 3000);
            }, 3000 + 500);
        });
    });
    
    navigator.getBattery().then((battery) => {

        const updateBatteryIcon = () => {
            const batteryPercentage = Math.round(battery.level * 100);

            console.log(batteryPercentage);
            let batterIcon = "";

            if (batteryPercentage <= 10) {

                batterIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>battery-10</title><path d="M16,18H8V6H16M16.67,4H15V2H9V4H7.33A1.33,1.33 0 0,0 6,5.33V20.67C6,21.4 6.6,22 7.33,22H16.67A1.33,1.33 0 0,0 18,20.67V5.33C18,4.6 17.4,4 16.67,4Z" /></svg>`;

            } else if (batteryPercentage <= 20) {

                batterIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>battery-20</title><path d="M16,17H8V6H16M16.67,4H15V2H9V4H7.33A1.33,1.33 0 0,0 6,5.33V20.67C6,21.4 6.6,22 7.33,22H16.67A1.33,1.33 0 0,0 18,20.67V5.33C18,4.6 17.4,4 16.67,4Z" /></svg>`;

            } else if (batteryPercentage <= 30) {

                batterIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>battery-30</title><path d="M16,15H8V6H16M16.67,4H15V2H9V4H7.33A1.33,1.33 0 0,0 6,5.33V20.67C6,21.4 6.6,22 7.33,22H16.67A1.33,1.33 0 0,0 18,20.67V5.33C18,4.6 17.4,4 16.67,4Z" /></svg>`;

            } else if (batteryPercentage <= 40) {

                batterIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>battery-40</title><path d="M16,14H8V6H16M16.67,4H15V2H9V4H7.33A1.33,1.33 0 0,0 6,5.33V20.67C6,21.4 6.6,22 7.33,22H16.67A1.33,1.33 0 0,0 18,20.67V5.33C18,4.6 17.4,4 16.67,4Z" /></svg>`;

            } else if (batteryPercentage <= 50) {

                batterIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>battery-50</title><path d="M16,13H8V6H16M16.67,4H15V2H9V4H7.33A1.33,1.33 0 0,0 6,5.33V20.67C6,21.4 6.6,22 7.33,22H16.67A1.33,1.33 0 0,0 18,20.67V5.33C18,4.6 17.4,4 16.67,4Z" /></svg>`;

            } else if (batteryPercentage <= 60) {

                batterIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>battery-60</title><path d="M16,12H8V6H16M16.67,4H15V2H9V4H7.33A1.33,1.33 0 0,0 6,5.33V20.67C6,21.4 6.6,22 7.33,22H16.67A1.33,1.33 0 0,0 18,20.67V5.33C18,4.6 17.4,4 16.67,4Z" /></svg>`;

            } else if (batteryPercentage <= 70) {

                batterIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>battery-70</title><path d="M16,10H8V6H16M16.67,4H15V2H9V4H7.33A1.33,1.33 0 0,0 6,5.33V20.67C6,21.4 6.6,22 7.33,22H16.67A1.33,1.33 0 0,0 18,20.67V5.33C18,4.6 17.4,4 16.67,4Z" /></svg>`;

            } else if (batteryPercentage <= 80) {

                batterIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>battery-80</title><path d="M16,9H8V6H16M16.67,4H15V2H9V4H7.33A1.33,1.33 0 0,0 6,5.33V20.67C6,21.4 6.6,22 7.33,22H16.67A1.33,1.33 0 0,0 18,20.67V5.33C18,4.6 17.4,4 16.67,4Z" /></svg>`;

            } else if (batteryPercentage <= 90) {

                batterIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>battery-90</title><path d="M16,8H8V6H16M16.67,4H15V2H9V4H7.33A1.33,1.33 0 0,0 6,5.33V20.67C6,21.4 6.6,22 7.33,22H16.67A1.33,1.33 0 0,0 18,20.67V5.33C18,4.6 17.4,4 16.67,4Z" /></svg>`;

            } else if (batteryPercentage <= 100) {

                batterIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>battery</title><path d="M16.67,4H15V2H9V4H7.33A1.33,1.33 0 0,0 6,5.33V20.67C6,21.4 6.6,22 7.33,22H16.67A1.33,1.33 0 0,0 18,20.67V5.33C18,4.6 17.4,4 16.67,4Z" /></svg>`;

            } else {

                batterIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>battery-low</title><path d="M16 20H8V6H16M16.67 4H15V2H9V4H7.33C6.6 4 6 4.6 6 5.33V20.67C6 21.4 6.6 22 7.33 22H16.67C17.41 22 18 21.41 18 20.67V5.33C18 4.6 17.4 4 16.67 4M15 16H9V19H15V16" /></svg>`;

            }

            $("#batteryIconContainer").html(batterIcon);
        }

        updateBatteryIcon();


    }).catch((error) => {

        console.error(error);

    });

    const addTimestampToExLinks = () => {
        const lnks = document.getElementById("addTimeStamp");
        if (lnks) {
            const timestamp = new Date().getTime();
            lnks.href = lnks.href.split('?')[0] + '?t=' + timestamp;
        }

    }

    addTimestampToExLinks();

});