/* Poetry page interaction: one paper letter opens at a time. */
const poems = [...document.querySelectorAll('.poetry-page .poem')];

poems.forEach((poem, index) => {
  const title = poem.querySelector('h2');
  if (!title) return;
  const trigger = document.createElement('button');
  trigger.type = 'button';
  trigger.className = 'poem-trigger';
  trigger.setAttribute('aria-expanded', 'false');
  trigger.setAttribute('aria-controls', `poem-letter-${index + 1}`);
  title.before(trigger);
  trigger.append(title);

  const body = document.createElement('div');
  body.className = 'poem-body';
  body.id = `poem-letter-${index + 1}`;
  body.setAttribute('aria-hidden', 'true');
  const copy = document.createElement('div');
  copy.className = 'poem-copy';
  while (trigger.nextSibling) copy.append(trigger.nextSibling);
  body.append(copy);
  poem.append(body);

  trigger.addEventListener('click', () => {
    const opening = !poem.classList.contains('is-open');
    poems.forEach((item) => {
      item.classList.remove('is-open');
      item.querySelector('.poem-trigger')?.setAttribute('aria-expanded', 'false');
      item.querySelector('.poem-body')?.setAttribute('aria-hidden', 'true');
    });
    if (opening) {
      poem.classList.add('is-open');
      trigger.setAttribute('aria-expanded', 'true');
      body.setAttribute('aria-hidden', 'false');
      setTimeout(() => poem.scrollIntoView({ behavior: 'smooth', block: 'start' }), 90);
    }
  });
});
