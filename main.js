const menu = document.querySelector('.menu-toggle');
if (menu) menu.addEventListener('click', () => { document.body.classList.toggle('menu-open'); menu.setAttribute('aria-expanded', document.body.classList.contains('menu-open')); });

const header = document.querySelector('.site-header');
let savedTheme = null;
try { savedTheme = localStorage.getItem('ali-theme'); } catch (error) {}
if (savedTheme === 'dark') document.documentElement.dataset.theme = 'dark';
if (header) {
  const theme = document.createElement('button');
  theme.className = 'theme-toggle'; theme.type = 'button'; theme.setAttribute('aria-label', 'Switch colour mode');
  const setThemeLabel = () => theme.textContent = document.documentElement.dataset.theme === 'dark' ? 'Light' : 'Dark';
  setThemeLabel();
  theme.addEventListener('click', () => { document.documentElement.dataset.theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'; try { localStorage.setItem('ali-theme', document.documentElement.dataset.theme); } catch (error) {} setThemeLabel(); });
  document.body.append(theme);
}

const typewriter = document.querySelector('.typewriter');
if (typewriter) {
  const phrases = JSON.parse(typewriter.dataset.phrases); let phrase = 0, letter = 0, deleting = false;
  const tick = () => { const text = phrases[phrase]; typewriter.textContent = text.slice(0, letter); if (!deleting && letter < text.length) { letter += 1; setTimeout(tick, 75); } else if (!deleting) { deleting = true; setTimeout(tick, 1500); } else if (letter > 0) { letter -= 1; setTimeout(tick, 45); } else { deleting = false; phrase = (phrase + 1) % phrases.length; setTimeout(tick, 280); } };
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches) tick(); else typewriter.textContent = phrases[0];
}

const projects = {
  kun: {type:'Independent publication', title:'KUN <i>Diaries</i>', intro:'A personal book born from a journey through Iraq, written slowly and then brought into print. It is part travel diary, part reflection, and very much my own voice. I wanted the writing to keep the small, strange and funny details that usually disappear once a trip is over.', role:'Writing · Editorial design · Cover design', accent:'red', hero:'/assets/kun.png/kun.png-3.png', images:['/assets/kun.png/kun.png-1.png','/assets/kun.png/kun.png-2.png'], note:'The cover draws from the ritual guidebooks that travelled with me, translating their familiar colours and small details into a book that feels personal before it is even opened. The physical format matters too: it lets the pace, pauses and memories sit with the reader instead of racing past on a screen.'},
  bfcsquad: {type:'Digital experience', title:'BFC <i>Squad</i>', intro:'A progressive web app for a community football club. It gives the squad one home for sessions, attendance, payments, team moments and the bits of club life that keep people coming back. The goal was to make the admin feel quick, while keeping the personality of match day intact.', role:'Experience design · UI design · Prototyping', accent:'dark', hero:'/assets/SQUAD/squad.png', gallery:'squad-gallery', images:['/assets/SQUAD/squad ss-1.png','/assets/SQUAD/squad ss-2.png','/assets/SQUAD/squad ss-3.png','/assets/SQUAD/squad ss-4.png','/assets/SQUAD/squad ss-5.png','/assets/SQUAD/squad ss-6.png','/assets/SQUAD/squad ss-7.png'], note:'I designed the app as a real clubhouse in your pocket. The UI covers the practical admin, but also leaves room for rivalry, rituals and the social energy that makes a team a team. Accessibility choices, activity views and clear hierarchy help it work for the entire squad, not only the loudest players. One feature I was proud of: fitness tracking pulled straight from Strava. I applied for Strava’s API and was approved for their premium membership tier on the first try, which let the app surface live run and match activity for the squad. It has since been switched off, since the ongoing API costs were not something a community club could justify long-term, but shipping it was a good exercise in scoping ambition against what a volunteer-run project can actually sustain.'},
  kalam: {type:'Campaign direction', title:'Kalam <i>25/26</i>', intro:'For ICG’s signature year-end production, I carried the campaign from the first reveal to the final curtain call, shaping its visual rhythm across social content, film and event materials. It was a chance to make the audience feel the scale and emotion of the show before they entered the theatre.', role:'Marketing Manager · Creative direction · Content', accent:'yellow', gallery:'kalam-gallery', hero:'/assets/kalam/ut.png', images:['/assets/kalam/poster.png','/assets/kalam/IMG_7130.jpg'], note:'This was a performance with heart, so the campaign needed more than neat graphics. Every post was made to build anticipation, introduce the people on stage and let the show’s atmosphere land before opening night. I held the visual thread across different formats, keeping the campaign recognisable while giving each piece its own job to do.', links:[['Watch the production teaser','https://youtu.be/Za2sqgHeZBg?si=zJ2-rVMHAxqPU26W']], resource:{label:'Read the Kalam 25/26 e-booklet', href:'https://heyzine.com/flip-book/c4ee64cdd2.html', image:'/assets/kalam/poster.png'}},
  lankaroma: {type:'Brand, packaging and website', title:'Lankaroma <i>Spices</i>', intro:'A visual world for a small spice brand with roots in Sri Lanka. The work spans packaging, product photography, website development and design, and social media management, each carrying the warm everyday character of cooking with real ingredients. It is a space where the styling can stay polished without losing the feeling of a real family kitchen.', role:'Design Manager · Brand direction · Photography', accent:'pale', hero:'/assets/lankaroma/lankaroma-logo.jpg', images:['/assets/lankaroma/Lankaroma img.jpeg','/assets/lankaroma/Lankaroma img2.jpeg'], note:'The aim is to make the brand feel vivid and familiar, like something passed across a family kitchen table. Rich colour, texture and a little appetite do most of the talking. Each image is composed to make the flavours feel present before a packet has even been opened.', links:[['Explore Lankaroma','https://lankaroma.com'],['Instagram','https://www.instagram.com/lankaroma/']]},
  ember: {type:'Web design', title:'Ember', intro:'A ticketing platform designed for people who care about the show as much as the seat. Ember gives independent art and quieter cultural events a calm place to be found, without the noise of a typical booking site fighting for attention.', role:'Web design · Interface design · Prototyping', accent:'ember', hero:'/assets/ember-logo.png', images:['/assets/Ember.png/Ember.png-1.png','/assets/Ember.png/Ember.png-2.png'], note:'I kept the interface restrained on purpose. The ticketing task stays simple, while the mood, typography and small moments of discovery make it feel less like a checkout and more like an invitation. It is practical first, but still leaves space for the personality of the event to lead.'},
  hushloop: {type:'Product Design', title:'Hush<i>loop</i>', intro:'A concept for calmer journeys with babies. Hushloop responds to the noise and pressure changes of travel with softness, simplicity and care for everyone sharing the space. The experience starts with the parent’s worry and follows it through to a clearer, gentler solution.', role:'Concept development · Research · Visual design', accent:'hush', hero:'/assets/hush.png/hushloop-box.jpg', images:['/assets/hush.png/hush.png-1.png'], note:'The project started with a very human problem: a little one in discomfort, and a long flight for everyone else. I turned that observation into a considered retail concept with an easy-to-understand story, thinking through how the object, packaging and explanation could all reassure someone at once.'},
  together: {type:'Interactive Experience (Web and Product)', title:'Together', intro:'A web app built around a simple belief: connection is easier when there is a reason to show up. Together helps people find communities, shared interests and somewhere to belong, turning the awkward first step into an invitation that feels low-pressure.', role:'Experience concept · Interface design · Prototype', accent:'together', gallery:'together-gallery', hero:'/assets/together/together-heart.jpg', images:['/assets/together/together.png-1.png','/assets/together/together.png-2.png','/assets/together/together.png-3.png','/assets/together/link-2.png','/assets/together/link-4.png','/assets/together/link-1.png'], note:'The digital experience is paired with Together Link, a small modular object that makes a welcome feel more tangible. It is a playful nudge toward talking to someone new, and a reminder that community often starts with a small, visible sign that someone is open to conversation.'},
  kallora: {type:'Product Experience and Circular Design', title:'Kall<i>öra</i>', intro:'A rethink of the familiar shelving unit. Kallöra is a flexible furniture system designed to be rearranged, expanded and kept in use as life changes around it. Rather than treating a move or a new room as a reason to replace everything, the system adapts with you.', role:'Concept development · Circular design · 3D model', accent:'kallora', gallery:'kallora-gallery', hero:'/assets/kallora/a.png', images:['/assets/kallora/k.png','/assets/kallora/l.png'], note:'The design focuses on the satisfying logic of a good system: uniform panels, magnetic connections and parts that earn their place again and again instead of becoming clutter. The details are there to make change feel simple, not like a complete rebuild.'},
  luminave: {type:'Mobile Application Design', title:'Lumi<i>nave</i>', intro:'A digital control experience for a lamp concept built around water, flow and light. Luminave turns a physical atmosphere into an interface you can gently tune. It began with a physical object and then asked what the same sense of calm could feel like on screen.', role:'Interface design · Interaction design · Prototype', accent:'luminave', gallery:'luminave-gallery', hero:'/assets/luminave.png/Picture 1.png-1.png', images:['/assets/luminave.png/Picture 1.png-1.png','/assets/luminave.png/Picture 1.png-2.png','/assets/luminave.png/Picture 1.png-3.png','/assets/luminave.png/Picture 1.png-4.png','/assets/luminave.png/Picture 1.png-5.png'], note:'I designed each screen around continuous states rather than hard, mechanical controls. The result is a prototype that feels closer to adjusting a mood than operating a device, with movement and feedback that follow the lamp’s own language of flow.'},
  story: {type:'Storytelling through media; film and editing', title:'KARMA: <i>a film project</i>', intro:'A short film that borrows the heightened emotion of a Bollywood television drama and places it in a recognisably Singaporean story. It is intentionally big, playful and a little dramatic, letting culture, timing and music do some wonderfully excessive work.', role:'Cinematography · Editing · Narrative execution', accent:'blue', hero:'/assets/karma/karma-title.png', images:['/assets/karma/karma-scene-1.png','/assets/karma/karma-scene-2.png'], note:'I handled the shoot and full edit, working carefully through continuity, framing and pace. The fun was in pushing every beat just far enough that the audience knew exactly how to feel, while still giving the performances and cultural references room to land. This was meant to be a group production, but the filming, the film’s visual style and the full edit ended up being mine alone to carry, start to finish.', links:[['Watch the film','https://drive.google.com/file/d/1JODMJS4smWIeiEaD7olprRJC1TeYneQt/view']]}
};

const workMain = document.querySelector('main.work-page');
if (workMain) {
  const key = new URLSearchParams(location.search).get('id');
  const p = key ? (projects[key] || projects.kun) : null;
  if (p) {
    document.title = p.title.replace(/<[^>]+>/g,'') + ' - Ali';
    const links = p.links ? `<div class="project-links">${p.links.map(([label,url])=>`<a href="${url}" target="_blank" rel="noreferrer">${label} <b>↗</b></a>`).join('')}</div>` : '';
    const resource = p.resource ? `<a class="project-resource" href="${p.resource.href}" target="_blank" rel="noreferrer"><img src="${p.resource.image}" alt="Kalam 25/26 e-booklet poster"><span>${p.resource.label} <b>↗</b></span></a>` : '';
    workMain.innerHTML = `<section class="project-hero ${p.accent}"><div><p class="kicker">${p.type}</p><h1>${p.title}</h1><p class="lede">${p.intro}</p><p class="project-role">${p.role}</p>${links}${resource}</div><div class="project-hero-image"><img src="${p.hero}" alt="${p.title.replace(/<[^>]+>/g,'')}"></div></section><section class="project-note"><p class="kicker">The approach</p><h2>${p.note}</h2></section>${p.images.length ? `<section class="project-gallery ${p.gallery || ''} ${p.images.length === 1 ? 'one' : ''}">${p.images.map((src,i)=>`<figure class="gallery-${i+1}"><img src="${src}" alt="${p.title.replace(/<[^>]+>/g,'')} detail ${i+1}"></figure>`).join('')}</section>` : ''}<section class="next-project"><p class="kicker">Keep exploring</p><a href="/work/">All selected work <b>↗</b></a></section>`;
  }
}

/* Portfolio motion enhancement: remove this block and the matching CSS block to disable site motion. */
const systemReducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const motionTargets = document.querySelectorAll('.hero h1, .page-intro h1, .about-hero h1, .contact-hero h1, .project-hero h1, .internship-copy h1, .feature-project, .project-split article, .work-card');
let revealObserver;
const setMotion = (enabled) => {
  revealObserver?.disconnect();
  document.documentElement.classList.toggle('motion-enabled', enabled);
  motionTargets.forEach((target) => target.classList.toggle('motion-reveal', enabled));
  if (!enabled) {
    motionTargets.forEach((target) => target.classList.remove('is-visible'));
    return;
  }
  if ('IntersectionObserver' in window) {
    revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    motionTargets.forEach((target) => revealObserver.observe(target));
  } else {
    motionTargets.forEach((target) => target.classList.add('is-visible'));
  }
};
const motionEnabled = !systemReducedMotion.matches;
setMotion(motionEnabled);
