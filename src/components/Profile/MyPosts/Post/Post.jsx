import classes from './Post.module.css';

const Post = (props) => {
  return (
    <div className={classes.item}>
      <img src='https://lh3.googleusercontent.com/proxy/bS-nMB5WLFSNjjdvLboazHyweAQGp5K_xPZgCTfzrRsykPUEGKmILCKlfdAylj4JARJ0-9KwMwtlTrtEmvYeK7YKsiCjeBjt84SYD8p2XGFCsNFnA2Bx6_uDoDWpWB6HapujKHtPEln8cvOxuA'></img>
              {props.message}
      <div>like {props.like}</div>
    </div>
  );
}

export default Post;