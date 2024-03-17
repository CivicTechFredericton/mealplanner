begin;

alter table if exists app.product add column image_url text;
alter table if exists app.product rename column source_link to source_url;

commit;