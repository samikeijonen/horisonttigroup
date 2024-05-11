import { PostSearchControl } from '@evermade/wp-block-toolkit';

export default function PostItemPicker( props ) {
    const {
        attributes: { postId },
        setAttributes,
    } = props;

    return (
        <PostSearchControl
            type="post"
            label="Valitse artikkeli"
            placeholder="Etsi..."
            value={ postId }
            onChange={ ( newPostId ) =>
                setAttributes( {
                    postId: newPostId,
                } )
            }
            numOfInitialResults={ 20 }
            filterResults={ ( results ) => {
                // You can modify the search results before returning them.
                return results;
            } }
        />
    );
}
