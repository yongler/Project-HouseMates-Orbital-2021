// preliminaries 
https://www.youtube.com/watch?v=m9PiPlRuy6E&t=304s

 (only for roommates post, in profile form its empty )
radiogroup for importance of each question, value stored in selected_choices
theres a score_list, total_score field in post model

assume only 1 post per user first 




// algo
get current_post.selected_choices (posts)
get current_post.owner.selected_choices (profile)

get other_post.selected_choices (posts)
get other_post.owner.selected_choices (profile)

n = 0

loop through length of selected_choices (posts), at every iteration:
    get score1 of current_post.choice, add to current_post.total_score (if dh)
    get score2 of other_post.choice, add to other_post.total_score (if dh)

    if current_post.choice === other_post.owner.choice:
        other_post.obtained_score += score1

    if current_post.owner.choice === other_post.choice:
        current_post.obtained_score += score2

    n += 1

    
percentage of other_post matching current_post = other_post.obtained_score / current_post.total_score 
percentage of current_post matching other_post = current_post.obtained_score / other_post.total_score 

matching percentage = nth root of 2 percentages

add to score_list of both posts:
    in other_post -> "current_post.owner.id":"matching percentage"
    in current_post -> "other_post.owner.id":"matching percentage"






// displaying 
at each post, if current user.id === score_list key, display matching percentage



