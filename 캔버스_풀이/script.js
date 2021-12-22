/** init **/
$(() => {
    $(document)
        .on("click", "button", view);

    view();
})

const view = () => {
    /** padding **/
    const padding = 40;
    /** canvas **/
    const canvas = $("canvas")[0];
    const ctx = canvas.getContext("2d");
    const width = canvas.width - padding*2;
    const height = canvas.height - padding*2;
    /** value **/
    const val = $("input").val();
    const arr = val.split(',');
    /** min, max **/
    const min = Math.min(...arr);
    const max = Math.max(...arr) - min ;
    /** plus X location **/
    const addX = width / (arr.length -1);
    /** get x,y location **/
    const getLocation = idx => {
        const x = addX * idx + padding;
        const y = padding + height - height * (+arr[idx] - min) / max;

        return [x,y]
    }
    /** draw **/
    // clear
    ctx.beginPath();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // start point
    ctx.moveTo(...getLocation(0));
    // repeat value
    arr.forEach((_, idx) => {
        // draw line
        ctx.lineTo(...getLocation(idx));
        ctx.stroke();
        // clear line path
        ctx.beginPath();
        // draw circle
        ctx.arc(...getLocation(idx), 4, 0, 2 * Math.PI);
        ctx.fill();
        // path setting to circle center
        ctx.moveTo(...getLocation(idx));
    })
}