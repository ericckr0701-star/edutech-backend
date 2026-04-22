-- Add image_url to books and align with frontend covers.
ALTER TABLE books ADD COLUMN image_url VARCHAR(500) NULL;

UPDATE books
SET image_url = CASE title
    WHEN 'Web Development with HTML, CSS, JS' THEN 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80'
    WHEN 'Public Speaking for Students' THEN 'https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&w=800&q=80'
    WHEN 'Calculus Practice Workbook' THEN 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=800&q=80'
    WHEN 'Modern Database Design' THEN 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=800&q=80'
    WHEN 'Programming Patterns Guide' THEN 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=800&q=80'
    WHEN 'Presentation Skills Toolkit' THEN 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=800&q=80'
    ELSE image_url
END;
