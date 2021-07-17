function dndSortJudge(
    hoverBoundingRect,
    nodeBoundingRect,
    dragIndex,
    hoverIndex,
    makeSign
) {
    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    // Get horizontal middle
    const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2;

    // Get pixels to the top
    const hoverClientY = nodeBoundingRect.y - hoverBoundingRect.top;

    // Get pixels to the left
    const hoverClientX = nodeBoundingRect.x - hoverBoundingRect.left;

    const upwards = dragIndex > hoverIndex && hoverClientY > hoverMiddleY;
    const downwards = dragIndex < hoverIndex && hoverClientY < hoverMiddleY;
    const leftwards = dragIndex > hoverIndex && hoverClientX > hoverMiddleX;
    const rightwards = dragIndex < hoverIndex && hoverClientX < hoverMiddleX;

    if (makeSign) {
        if (hoverClientY > hoverMiddleY) {
            return "down";
        } else if (hoverClientY < hoverMiddleY) {
            let half = false;

            if (upwards || downwards) {
                half = true;
            }

            return "up";
        }
    }

    if (upwards) {
        return false;
    }

    if (downwards) {
        return false;
    }

    return true;
}

export default dndSortJudge;