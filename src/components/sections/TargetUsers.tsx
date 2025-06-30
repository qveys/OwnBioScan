import React, { memo, useMemo } from 'react';
import { TARGET_USERS_CONTENT } from '../../data/content';
import { Section } from '../ui';

const UserGroup: React.FC<{
  icon: React.ComponentType<{ className?: string; size?: number }>;
  bgColor: string;
  title: string;
  description: string;
  index: number;
}> = memo(({ icon: Icon, bgColor, title, description, index }) => {
  const animationDelay = useMemo(() => `${index * 0.15}s`, [index]);
  
  return (
    <div 
      className="flex flex-col items-center text-center animate-fade-in-up"
      style={{ animationDelay }}
    >
      <div className={`icon-container bg-${bgColor}-700 bg-opacity-10 gpu-accelerated`}>
        <Icon className={`w-8 h-8 text-${bgColor}-900`} />
      </div>
      <h3 className="text-xl font-montserrat font-bold uppercase mt-6 mb-2">{title}</h3>
      <p className="text-text-secondary">{description}</p>
    </div>
  );
});

UserGroup.displayName = 'UserGroup';

const TargetUsers: React.FC = memo(() => {
  const { title, description, userGroups } = TARGET_USERS_CONTENT;

  const userGroupComponents = useMemo(() => 
    userGroups.map((group, index) => (
      <UserGroup 
        key={group.title}
        icon={group.icon}
        bgColor={group.bgColor}
        title={group.title}
        description={group.description}
        index={index}
      />
    )), [userGroups]
  );

  return (
    <Section title={title} description={description} background="gradient">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
        {userGroupComponents}
      </div>
    </Section>
  );
});

TargetUsers.displayName = 'TargetUsers';

export default TargetUsers;