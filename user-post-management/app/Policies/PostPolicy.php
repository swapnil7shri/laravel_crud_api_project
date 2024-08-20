<?php

namespace App\Policies;

use App\Models\Post;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class PostPolicy
{
    /**
     * Determine whether the user can permanently delete the model.
     */
    public function modify(User $user, Post $post): Response
    {
        // Allow if the user is an admin
        if ($user->role === 'admin') {
            return Response::allow();
        }

        // Allow if the user owns the post
        if ($user->id === $post->user_id) {
            return Response::allow();
        }

        // Deny access if neither condition is met
        return Response::deny('You do not have permission to modify this post.');
    }
}
