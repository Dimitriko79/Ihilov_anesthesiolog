import classes from './loader.module.scss';

const Loader = () => {
    return (
        <div className={classes.mask}>
            <div className={classes.loader}/>
        </div>
    )
}

export default Loader;