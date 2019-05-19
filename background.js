 // http://tweeeety.hateblo.jp/entry/20131030/1383129160
 // https://qiita.com/howdy39/items/9ac0564da56246472fc5
 chrome.contextMenus.create({
    title: "imgタグに変換してクリップボードに保存する",
    contexts: ["all"],
    type: "normal",
    onclick: function (info) {
        // http://searene.me/2015/12/09/get-selected-text-in-chrome/
        chrome.tabs.executeScript(null, { file: 'content.js' }); 
        chrome.runtime.onMessage.addListener(function(message)  { 
            console.log(message.selectionText)
            const regex = /!\[(?<text>.+)\]\((?<url>(http|https):\/\/([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?)\)/g;
            const match = regex.exec(message.selectionText)
            if (!match)
                return;
            const g = match.groups;
            const imgTag = `<img width="350" alt="${g.text}" src="${g.url}">`;
            const textArea = document.createElement("textarea");
            document.body.appendChild(textArea);
            textArea.value = imgTag;
            textArea.select();
            document.execCommand("copy");
            document.body.removeChild(textArea);
        }); 
    }
});