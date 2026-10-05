/* Poetry page interaction: one paper letter opens at a time. */
const collection = document.querySelector('.poetry-page .poetry-collection');

if (collection) {
  const poems = [...collection.querySelectorAll('.poem')].reverse();
  // Each desktop letter needs enough width for the author's Urdu line breaks.
  const desktopLayout = window.matchMedia('(min-width: 1200px)');
  const columns = [0, 1].map(() => {
    const column = document.createElement('div');
    column.className = 'poetry-column';
    return column;
  });

  poems.forEach((poem) => collection.append(poem));

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
        requestAnimationFrame(() => poem.scrollIntoView({ behavior: 'smooth', block: 'start' }));
      }
    });
  });

  const arrangePoems = () => {
    if (desktopLayout.matches) {
      collection.replaceChildren(...columns);
      poems.forEach((poem, index) => columns[index % columns.length].append(poem));
      return;
    }

    collection.replaceChildren(...poems);
  };

  arrangePoems();
  desktopLayout.addEventListener('change', arrangePoems);
}
