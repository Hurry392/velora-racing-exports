# Velora Racing Exports — Supabase setup

1. Create a project at https://supabase.com.
2. Open SQL Editor and run the contents of `supabase/schema.sql`.
3. In Authentication > Users, create your admin user with your own email and a strong password. Disable public sign-ups in Authentication settings.
4. Copy the admin user's UUID from Authentication > Users. In SQL Editor run (replace the UUID):

```sql
insert into public.admin_users (user_id) values ('YOUR-ADMIN-USER-UUID');
```

5. In Project Settings > API, copy the Project URL and publishable/anon key. Never put a service_role key in a browser variable.
6. In Vercel > Project > Settings > Environment Variables, add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` for Production, Preview and Development. Set `NEXT_PUBLIC_WHATSAPP_NUMBER=923011111111`.
7. Redeploy the project.
8. Open `/admin` and sign in using the admin email/password you created.

The product table is shared between visitors and admins. Public visitors can only read active products; only UUIDs explicitly listed in `admin_users` can add/edit/delete products. Do not share your password or service-role key.
