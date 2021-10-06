document.querySelector('#create-story').addEventListener('click', () => {
    const nouns = document.querySelector('#nouns').value;
    const adjectives = document.querySelector('#adjs').value;
    const verbs = document.querySelector('#verbs').value;

    const nounsArray = nouns.split(/\s+/);
    const adjectivesArray = adjectives.split(/\s+/);
    const verbsArray = verbs.split(/\s+/);

    if (nounsArray.length === 3 && adjectivesArray.length === 3 && verbsArray.length === 3) {
        const story = stories(nounsArray, adjectivesArray, verbsArray);

        document.querySelector('#story').textContent = story;
        document.querySelector('.story').classList.remove('hidden');

        document.querySelector('#alert').classList.add('hidden');
    }
    else {
        document.querySelector('#alert').classList.remove('hidden');
    }
})

function stories(nounArr, adjectives, verbs) {
    let nouns = [];
    nounArr.forEach( noun => { //if verb is plural, make it singular
        if (noun[noun.length - 1] === 's') {
            const n = noun.substring(0, noun.length - 1);
            nouns.push(n);
        }
        else {
            nouns.push(noun)
        }
    })

    const story = `There once was a very ${adjectives[0]} ${nouns[0]} that loved to ${verbs[0]}. One day, the ${nouns[0]} met a new friend, a ${nouns[1]}, that did not like to ${verbs[1]}. The ${nouns[0]} really wanted to ${verbs[1]}, so the ${nouns[1]} became really ${adjectives[1]}. Then, the ${nouns[0]} met a ${nouns[2]}, and they decided to ${verbs[2]}. They were both ${adjectives[2]}.`;
    return story;
}