# Quick Copy Commands for Agentic-01 to AIRL

## One-Liner Copy (if both repos are cloned locally)

```bash
# From PF-Prototype-Shared repository root
cp -r "1 Architecture/0.2 Agentic-Engineer/Agentic-01"/* "../AIRL/3-PF-Core/CI-CD-PaaS-DevStageProd Pipeline/" && cd "../AIRL" && git add "3-PF-Core/CI-CD-PaaS-DevStageProd Pipeline" && git commit -m "Add Agentic-01 framework files" && git push origin main
```

## Archive Method (Single Command)

```bash
# Create archive and instructions
cd "1 Architecture/0.2 Agentic-Engineer" && tar -czf ../../agentic-01-for-airl.tar.gz Agentic-01 && cd ../.. && echo "Archive created: agentic-01-for-airl.tar.gz" && echo "To extract in AIRL repo: tar -xzf agentic-01-for-airl.tar.gz -C '3-PF-Core/CI-CD-PaaS-DevStageProd Pipeline' --strip-components=1"
```

## rsync Method (Preserves permissions and timestamps)

```bash
# From PF-Prototype-Shared repository root
rsync -av "1 Architecture/0.2 Agentic-Engineer/Agentic-01/" "../AIRL/3-PF-Core/CI-CD-PaaS-DevStageProd Pipeline/"
```

## Git Subtree Method (Maintains History)

```bash
# From AIRL repository
cd ../AIRL
git subtree add --prefix="3-PF-Core/CI-CD-PaaS-DevStageProd Pipeline" ../PF-Prototype-Shared "1 Architecture/0.2 Agentic-Engineer/Agentic-01" main --squash
```

## Verification Command

```bash
# After copying, verify file count (should be 46 files)
find "3-PF-Core/CI-CD-PaaS-DevStageProd Pipeline" -type f | wc -l
```

## File Count and Size Check

```bash
# In AIRL repository after copy
cd "3-PF-Core/CI-CD-PaaS-DevStageProd Pipeline"
echo "File count: $(find . -type f | wc -l)"
echo "Total size: $(du -sh .)"
```

Expected results:
- File count: 46
- Total size: ~1.2M

## Common Issues and Solutions

### Issue: Target directory has spaces
**Solution:** Use quotes around the path:
```bash
cp -r "source" "3-PF-Core/CI-CD-PaaS-DevStageProd Pipeline/"
```

### Issue: Permission denied
**Solution:** Check repository write access:
```bash
cd ../AIRL
git remote -v
git config user.name
git config user.email
```

### Issue: Files already exist
**Solution:** Backup or remove existing files:
```bash
cd "3-PF-Core/CI-CD-PaaS-DevStageProd Pipeline"
# Backup
cp -r . ../backup-$(date +%Y%m%d)
# Or remove
rm -rf *
```

## Post-Copy Checklist

- [ ] Verify file count (46 files)
- [ ] Check total size (~1.2MB)
- [ ] Review git status
- [ ] Stage changes (`git add`)
- [ ] Commit with meaningful message
- [ ] Push to main branch
- [ ] Verify on GitHub web interface

## Related Documentation

- Full instructions: See `COPY-TO-AIRL-README.md`
- Automated script: Run `./copy-agentic-01-to-airl.sh`
- File manifest: See `agentic-01-file-manifest.txt`
