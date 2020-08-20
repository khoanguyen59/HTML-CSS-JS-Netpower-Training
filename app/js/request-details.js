
let messages = [
    {
        content: 'Temporibus maxime est architecto rem non.',
        user: {
            username: 'User 1',
            avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/stefanotirloni/128.jpg'
        },
        children: [
            {
                content: 'Omnis assumenda ut.',
                user: {
                    username: 'User 1',
                    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/stefanotirloni/128.jpg'
                },
            }
        ]
    },
    {
        content: 'Sunt ratione veniam temporibus assumenda quia sit.',
        user: {
            username: 'User 2',
            avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/bruno_mart/128.jpg'
        },
        children: []
    },
    {
        content: 'Laboriosam optio deleniti dolorem optio aliquam omnis.',
        user: {
            username: 'User 1',
            avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/falconerie/128.jpg'
        },
        children: []
    }
];

function createNewMessage(messageContent, author) {
    if (messageContent.trim() === '') {
        alert('Content is too short');
        return null;
    }

    return {
        content: messageContent,
        user: author
    }
}

function renderMessage(message, depth) {
    const media = document.createElement('div')
    media.setAttribute('class', 'media')
    console.log(depth)
    const html = `
        <a class="mr-3" href="#">
            <img src="${message.user.avatar}"
                class="mr-3 rounded-circle" alt="Placeholder image">
        </a>
        <div class="media-body">
            <h5 class="mt-0">${message.user.username}</h5>
            <p>${message.content}</p>
            ${
                depth===0?
                `<div class="actions mb-2">
                    <a href="#" class="action action--reply">
                        Reply
                    </a>
                </div>`
                :''
            }
            
            <div class="children"></div>
        </div>
    `;

    media.innerHTML = html;

    const childrenContainer = media.querySelector('.children')

    if (depth === 0) {
        const actionsEl = media.querySelector('.media-body > .actions');
        actionsEl.querySelector('.action--reply').addEventListener('click', event => {
            event.preventDefault();
            
            let openingReplyForm = document.querySelector('.conversations .reply-form');
            openingReplyForm && openingReplyForm.remove();

            const replyFormContainer = document.createElement('div')
            replyFormContainer.setAttribute('class', 'reply-form')
            replyFormContainer.innerHTML = `
                <form action="#" class="d-flex align-items-start">
                    <textarea class="form-control mr-3" placeholder="Enter your message..." row="10" aria-describedby="helpId"></textarea>
                    <button class="btn btn-primary">Send</button>
                </form>
            `

            replyFormContainer.querySelector('form').addEventListener('submit', event => {
                event.preventDefault();

                const msgInput = event.target.querySelector('textarea');
                const msgContent = msgInput.value;

                const msg = createNewMessage(
                    msgContent,
                    { username: 'Some user', avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/okansurreel/128.jpg' }
                );
                if (!msg) return;
                const msgEl = renderMessage(msg, depth + 1);

                childrenContainer.appendChild(msgEl);
                msgEl.scrollIntoView();
                msgInput.value = '';
            })

            actionsEl.parentElement.insertBefore(replyFormContainer, actionsEl.nextSibling);
        })
    }

    if (message.children) {
        console.log('about to render children', depth + 1)
        renderMessages(message.children, depth + 1).forEach(child => {
            childrenContainer.appendChild(child)
        })
    }

    return media;
}

function renderMessages(messages, depth=0) {
    return messages.map(message => {
        return renderMessage(message, depth);
    })
}

document.addEventListener('DOMContentLoaded', () => {
    const conversations = document.querySelector('.conversations')
    conversations.innerHTML = '';

    renderMessages(messages, 0).forEach(message => {
        conversations.appendChild(message)
    })

    document.querySelector('.comment-form').addEventListener('submit', event => {
        event.preventDefault();

        const msgInput = event.target.querySelector('textarea');
        const msgContent = msgInput.value;
        const msg = createNewMessage(
            msgContent,
            { username: 'Some user', avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/okansurreel/128.jpg' }
        );
        if (!msg) return;
        const msgEl = renderMessage(msg, 0);

        conversations.appendChild(msgEl);
        msgEl.scrollIntoView();
        msgInput.value = '';
    })
});