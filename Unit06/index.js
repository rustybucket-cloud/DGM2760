document.querySelector('#create-story').onclick = () => {
    const nouns = document.querySelector('#nouns').value;
    const adjectives = document.querySelector('#adjs').value;
    const verbs = document.querySelector('#verbs').value;

    const nounsArray = nouns.split(/\s+/);
    const adjectivesArray = adjectives.split(/\s+/);
    const verbsArray = verbs.split(/\s+/);

    const story = stories(nounsArray, adjectivesArray, verbsArray);

    document.querySelector('#story').textContent = story;
    document.querySelector('.story').classList.remove('hidden');
}

function stories(nouns, adjectives, verbs) {
    const story = `There once was a very ${adjectives[0]} ${nouns[0]} that loved to ${verbs[0]}. One day, the ${nouns[0]} met a new friend, a ${nouns[1]}, that did not like to ${verbs[1]}. The ${nouns[0]} really wanted to ${verbs[1]}, so the ${nouns[1]} became really ${adjectives[1]}. Then, the ${nouns[0]} met a ${nouns[2]}, and they decided to ${verbs[2]}. They were both ${adjectives[2]}.`;
    return story;
}