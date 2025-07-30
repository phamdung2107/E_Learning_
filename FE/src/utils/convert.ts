export const convertCategoriesToTreeData = (categories: any) => {
    return categories.map((cat: any) => ({
        title: cat.name,
        value: cat.id,
        key: cat.id,
        children: cat.children ? convertCategoriesToTreeData(cat.children) : [],
    }))
}
