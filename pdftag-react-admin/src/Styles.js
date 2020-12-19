import {makeStyles} from '@material-ui/core/styles';


export const width = (width) => ({
    maxWidth: `${width}em`,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
})
//TODO 完善
export const useEllipsisWidth = makeStyles(Object.fromEntries(
    Array.from(Array(100).keys()).map(index => [`width${index}`, width(index)])
));
