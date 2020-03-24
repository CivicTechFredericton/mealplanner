#!/usr/bin/env bash
if [[ ${ENABLE_SSH,,} == 'true' ]]; then
    echo "Enabling SSH Debugging..."
    apt-get update >/dev/null && \
    apt-get install -y vim openssh-server vim >/dev/null && \
    mkdir -p /var/run/sshd /root/.ssh && \
    cat .docker/debug_key.pub >> /root/.ssh/authorized_keys && \
    sed -i 's/prohibit-password/yes/' /etc/ssh/sshd_config && \
    chown -R root:root /root/.ssh;chmod -R 700 /root/.ssh && \
    echo "StrictHostKeyChecking=no" >> /etc/ssh/ssh_config
    /usr/sbin/sshd &
fi
exec "$@"
