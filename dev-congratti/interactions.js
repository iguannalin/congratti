interact(".resize").resizable({
    edges: { right: true, bottom: true },
    listeners: {
        move(event) {
            const target = event.target;
            const rect = event.rect;

            // update the element's style
            target.style.width = rect.width + "px";
            target.style.height = rect.height + "px";
        }
    }
});

const position = { x: 0, y: 0 };
interact('.draggable').draggable({
    listeners: {
        move (event) {
            position.x += event.dx;
            position.y += event.dy;

            event.target.style.transform =
                `translate(${position.x}px, ${position.y}px)`
        },
    }
});

