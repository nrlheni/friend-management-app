export const getFriendRequestList = async (data: { email: string }) => {
    const response = await fetch(`/api/friend/request?email=${data.email}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error('Failed to get friend request list');
    }

    return await response.json();
};

export const getFriendList = async (data: { email: string }) => {
    const response = await fetch(`/api/friend/?email=${data.email}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error('Failed to get friend list');
    }

    return await response.json();
};

export const getUserList = async (data: { email: string }) => {
    const response = await fetch(`/api/auth/users?email=${data.email}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error('Failed to get user list');
    }

    return await response.json();
};

export const getMutualList = async (emails: string[]) => {
    const response = await fetch(`/api/friend/mutual?emails=${emails.join(',')}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error('Failed to get mutual friend list');
    }

    return await response.json();
};

export const getBlockList = async (data: { email: string }) => {
    const response = await fetch(`/api/friend/block?email=${data.email}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error('Failed to get block list');
    }

    return await response.json();
};


export const AcceptRejectRequest = async (data: { friendRequestID: number; status: string }) => {
    const response = await fetch('/api/friend/request/update', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error('Failed to accept/reject the request');
    }

    return await response.json();
};

export const CreateFriendRequest = async (data: { requester: string, to:string; }) => {
    const response = await fetch('/api/friend/request', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error('Failed to accept/reject the request');
    }

    return await response.json();
};

export const BlockFriend = async (data: { requester: string, block:string; }) => {
    const response = await fetch('/api/friend/block', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error('Failed to block friend');
    }

    return await response.json();
};
