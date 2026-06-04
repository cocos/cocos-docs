
(() => {
    const makeOutIn = (infx, outfx) => {
        return (k) => {
            if (k < 0.5) {
                return outfx(k * 2) / 2;
            }
            return infx(2 * k - 1) / 2 + 0.5;
        };
    };

    const quadInFx = (k) => k * k;

    const quadOutFx = (k) => k * (2 - k);

    const methods = [
        {name: 'linear', fx: ((k) => k),},
        {name: 'constant', fx: ((k) => 0)},
        {name: 'quadIn', fx: quadInFx},
        {name: 'quadOut', fx: quadOutFx},
        {name: 'quadInOut', fx: makeOutIn(quadInFx, quadOutFx)},
        {name: 'quadOutIn', fx: ((k) => k)},
    ];

    window.initializeEasingMethodsExample = (parent) => {
        const table = parent.appendChild(document.createElement('table'));
        const showcases = [];
        for (const method of methods) {
            const { name, fx } = method;
            const tr = table.appendChild(
                document.createElement('tr'));

            const label = tr.appendChild(document.createElement('td')).
                appendChild(document.createElement('label'));
            label.textContent = name;

            const image = tr.appendChild(document.createElement('td')).
                appendChild(document.createElement('img'));
            image.src = "https://forum.cocos.org/images/logo.png";

            const slider = tr.appendChild(document.createElement('td')).
                appendChild(document.createElement('input'));
            slider.type = 'range';
            slider.min = 0;
            slider.max = 100;
            slider.value = 0;

            showcases.push({
                label,
                image,
                fx,
                slider,
            });
        }

        const firstTime = Date.now();
        let duration = 3000;
        setInterval(() => {
            const timePast = Date.now() - firstTime;
            const ratio = (timePast % duration) / duration;
            for (const showcase of showcases) {
                const mappedRatio = showcase.fx(ratio);
                showcase.image.style.opacity = (1.0- mappedRatio);
                showcase.slider.value = 100 * mappedRatio;
            }
        }, 16);
    };
})();

(() => {
    let easingMethodsExampleInitialized = false;
    window.onEasingMethodExampleButtonClicked = () => {
        const panel = document.getElementById('easing-method-example-panel');
        if (!easingMethodsExampleInitialized) {
            easingMethodsExampleInitialized = true;
            initializeEasingMethodsExample(panel);
        } else {
            panel.hidden = !panel.hidden;
        }
    };
})();

export default ()=>{};
