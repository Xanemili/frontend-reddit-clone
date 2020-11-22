"""create post model and update relationships

Revision ID: 04ef402c4795
Revises: 50f97b31db47
Create Date: 2020-11-21 12:12:53.282544

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = '04ef402c4795'
down_revision = '50f97b31db47'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('subreddits',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=30), nullable=True),
    sa.Column('about', sa.Text(), nullable=True),
    sa.Column('rules', sa.Text(), nullable=True),
    sa.Column('owner', sa.Integer(), nullable=False),
    sa.Column('created_on', sa.DateTime(), server_default=sa.text('now()'), nullable=True),
    sa.Column('updated_on', sa.DateTime(), server_default=sa.text('now()'), nullable=True),
    sa.ForeignKeyConstraint(['owner'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('name')
    )
    op.create_table('posts',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(length=255), nullable=False),
    sa.Column('type', sa.String(length=10), nullable=False),
    sa.Column('content', sa.Text(), nullable=False),
    sa.Column('karma', sa.Integer(), nullable=False),
    sa.Column('created_on', sa.DateTime(), server_default=sa.text('now()'), nullable=True),
    sa.Column('updated_on', sa.DateTime(), server_default=sa.text('now()'), nullable=True),
    sa.Column('userId', sa.Integer(), nullable=False),
    sa.Column('subredditId', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['subredditId'], ['subreddits.id'], ),
    sa.ForeignKeyConstraint(['userId'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.drop_table('subreddit')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('subreddit',
    sa.Column('id', sa.INTEGER(), autoincrement=True, nullable=False),
    sa.Column('name', sa.VARCHAR(length=30), autoincrement=False, nullable=True),
    sa.Column('about', sa.TEXT(), autoincrement=False, nullable=True),
    sa.Column('rules', sa.TEXT(), autoincrement=False, nullable=True),
    sa.Column('owner', sa.INTEGER(), autoincrement=False, nullable=False),
    sa.Column('created_on', postgresql.TIMESTAMP(), server_default=sa.text('now()'), autoincrement=False, nullable=True),
    sa.Column('updated_on', postgresql.TIMESTAMP(), server_default=sa.text('now()'), autoincrement=False, nullable=True),
    sa.ForeignKeyConstraint(['owner'], ['users.id'], name='subreddit_owner_fkey'),
    sa.PrimaryKeyConstraint('id', name='subreddit_pkey'),
    sa.UniqueConstraint('name', name='subreddit_name_key')
    )
    op.drop_table('posts')
    op.drop_table('subreddits')
    # ### end Alembic commands ###